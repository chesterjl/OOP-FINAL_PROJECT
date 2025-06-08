package in.group6.CafeShopManagementSystem.service;

import in.group6.CafeShopManagementSystem.io.CategoryRequest;
import in.group6.CafeShopManagementSystem.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);

}
