package in.group6.CafeShopManagementSystem.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse {

    private String categoryId;
    private String name;
    private String description;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imageUrl;
    private Integer items;

}
