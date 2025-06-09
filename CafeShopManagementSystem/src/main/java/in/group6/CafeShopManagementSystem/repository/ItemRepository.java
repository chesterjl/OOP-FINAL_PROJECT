package in.group6.CafeShopManagementSystem.repository;

import in.group6.CafeShopManagementSystem.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategoryId(Long id);

    Optional<ItemEntity> findByName(String name);

    @Query("SELECT COUNT(i) FROM ItemEntity i")
    Long totalItems();

}
