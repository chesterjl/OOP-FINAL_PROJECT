package in.group6.CafeShopManagementSystem.service.impl;

import in.group6.CafeShopManagementSystem.entity.CategoryEntity;
import in.group6.CafeShopManagementSystem.io.CategoryRequest;
import in.group6.CafeShopManagementSystem.io.CategoryResponse;
import in.group6.CafeShopManagementSystem.repository.CategoryRepository;
import in.group6.CafeShopManagementSystem.repository.ItemRepository;
import in.group6.CafeShopManagementSystem.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        try {
            String fileName = UUID.randomUUID().toString()+"."+ StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            String imageUrl = "http://localhost:8080/api/v1.0/uploads/"+fileName;
            CategoryEntity newCategory = convertToEntity(request);
            newCategory.setImageUrl(imageUrl);
            newCategory = categoryRepository.save(newCategory);
            return convertToResponse(newCategory);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public CategoryResponse update(CategoryRequest request, MultipartFile file) throws IOException{
        CategoryEntity existingCategory = categoryRepository.findByName(request.getName())
                .orElseThrow(() -> new RuntimeException("Category name not found: " +request.getName()));

        existingCategory.setName(request.getNewName());
        existingCategory.setNewName(request.getNewName());
        existingCategory.setDescription(request.getDescription());

        if (file != null && !file.isEmpty()) {
            String oldImageUrl = existingCategory.getImageUrl();
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
            existingCategory.setImageUrl("http://localhost:8080/api/v1.0/uploads/" + newFileName);
        }

        categoryRepository.save(existingCategory);
        return convertToResponse(existingCategory);

    }


    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
         CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));
         String imageUrl = existingCategory.getImageUrl();
         String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
         Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
         Path filePath = uploadPath.resolve(fileName);
         try {
            Files.deleteIfExists(filePath);
         } catch (IOException e) {
             e.printStackTrace();
         }
        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());

        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .newName(newCategory.getName())
                .description(newCategory.getDescription())
                .imageUrl(newCategory.getImageUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .newName(request.getName())
                .description(request.getDescription())
                .build();
    }
}
