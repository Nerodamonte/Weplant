package com.Weplant.services;

import com.Weplant.dtos.requests.PackageCreateRequest;
import com.Weplant.dtos.responses.PackageDetailResponse;
import com.Weplant.entities.PackageEntity;
import com.Weplant.repositories.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PackageService {
    @Autowired
    PackageRepository packageRepository;

    public List<PackageDetailResponse> getAll() {
        List<PackageEntity> packageEntityList = packageRepository.findAll();
        return packageEntityList.stream()
                .map(packageEntity -> PackageDetailResponse.builder()
                .packageId(packageEntity.getPackageId())
                .packageName(packageEntity.getPackageName())
                .packageDescription(packageEntity.getPackageDescription())
                .packagePrice(packageEntity.getPackagePrice())
                .build()).toList();
    }

    public void createPackage(PackageCreateRequest request){
        PackageEntity packageEntity = PackageEntity.builder()
                .packageName(request.getPackageName())
                .packageDescription(request.getPackageDescription())
                .packagePrice(request.getPackagePrice())
                .build();
        packageRepository.save(packageEntity);
    }

    public void delete(Long id){
        packageRepository.deleteById(id);
    }

    public void update(Long id, PackageCreateRequest request){
        PackageEntity packageEntity = packageRepository.findById(id).orElseThrow();
        packageEntity.setPackageName(request.getPackageName());
        packageEntity.setPackageDescription(request.getPackageDescription());
        packageEntity.setPackagePrice(request.getPackagePrice());
        packageRepository.save(packageEntity);
    }
}
