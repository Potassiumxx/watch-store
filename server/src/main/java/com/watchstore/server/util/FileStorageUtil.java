package com.watchstore.server.util;

import java.io.IOException;
import java.io.File;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class FileStorageUtil {

  private static String generateRandomFileName(String originalFileName) {
    int dotIndex = originalFileName.lastIndexOf(".");
    String fileExtension = originalFileName.substring(dotIndex);
    return UUID.randomUUID().toString() + fileExtension;
  }

  public static String saveFile(MultipartFile file, String directory) throws IOException {

    String fileName = file.getOriginalFilename();
    String randomFileName = generateRandomFileName(fileName);
    File destination = new File(directory, randomFileName);
    file.transferTo(destination);
    return randomFileName;
  }

  public static boolean deleteFile(String fileName, String uploadDirectory) {
    if (fileName == null || fileName.isEmpty()) {
      return false;
    }
    File file = new File(uploadDirectory + File.separator + fileName);
    if (file.exists()) {
      return file.delete();
    }
    return false;
  }
}
