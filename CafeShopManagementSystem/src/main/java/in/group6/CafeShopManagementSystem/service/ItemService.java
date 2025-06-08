package in.group6.CafeShopManagementSystem.service;

import in.group6.CafeShopManagementSystem.io.ItemRequest;
import in.group6.CafeShopManagementSystem.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file) throws IOException;

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);

    ItemResponse update(ItemRequest request, MultipartFile file) throws IOException;

}
