package in.group6.CafeShopManagementSystem.repository;

import in.group6.CafeShopManagementSystem.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByCategoryId(String categoryId);

    Optional<CategoryEntity> findByName(String name);

    @Query("SELECT COUNT(i) FROM CategoryEntity i")
    Long totalCategory();
}
