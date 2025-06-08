package in.group6.CafeShopManagementSystem.service.impl;

import in.group6.CafeShopManagementSystem.entity.CategoryEntity;
import in.group6.CafeShopManagementSystem.entity.ItemEntity;
import in.group6.CafeShopManagementSystem.io.ItemRequest;
import in.group6.CafeShopManagementSystem.io.ItemResponse;
import in.group6.CafeShopManagementSystem.repository.CategoryRepository;
import in.group6.CafeShopManagementSystem.repository.ItemRepository;
import in.group6.CafeShopManagementSystem.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString()+"."+ StringUtils.getFilenameExtension(file.getOriginalFilename());
        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetLocation = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String imageUrl = "http://localhost:8080/api/v1.0/uploads/"+fileName;
        ItemEntity newItem = convertToEntity(request);

        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found for ID: " + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImageUrl(imageUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    @Override
    public ItemResponse update(ItemRequest request, MultipartFile file) throws IOException {
        // Find the existing item by name

        ItemEntity existingItem = itemRepository.findByName(request.getName())
                .orElseThrow(() -> new RuntimeException("Item name not found: " + request.getName()));

        // Update basic fields
        existingItem.setName(request.getNewName());
        existingItem.setNewName(request.getNewName());
        existingItem.setDescription(request.getDescription());
        existingItem.setPrice(request.getPrice());

        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found for ID: " + request.getCategoryId()));
        existingItem.setCategory(existingCategory);

        if (file != null && !file.isEmpty()) {
            String oldImageUrl = existingItem.getImageUrl();
            if (oldImageUrl != null) {
                String oldFileName = oldImageUrl.substring(oldImageUrl.lastIndexOf("/") + 1);
                Path oldFilePath = Paths.get("uploads").toAbsolutePath().normalize().resolve(oldFileName);
                Files.deleteIfExists(oldFilePath);
            }

            String newFileName = UUID.randomUUID().toString() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetLocation = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            existingItem.setImageUrl("http://localhost:8080/api/v1.0/uploads/" + newFileName);
        }

        // Save and return
        existingItem = itemRepository.save(existingItem);
        return convertToResponse(existingItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .newName(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imageUrl(newItem.getImageUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .newName(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId).orElseThrow(() -> new RuntimeException("Item not found for ID: " + itemId));
        String imageUrl = existingItem.getImageUrl();
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
        Path filePath = uploadPath.resolve(fileName);
        try {
            Files.deleteIfExists(filePath);
            itemRepository.delete(existingItem);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
        }
    }

}
