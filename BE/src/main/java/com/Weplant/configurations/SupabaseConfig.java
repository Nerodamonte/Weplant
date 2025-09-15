package com.Weplant.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "supabase")
public class SupabaseConfig {
    private String url;
    private String serviceRoleKey;
    private String bucket;
    private boolean bucketPublic = true;

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getServiceRoleKey() { return serviceRoleKey; }
    public void setServiceRoleKey(String serviceRoleKey) { this.serviceRoleKey = serviceRoleKey; }
    public String getBucket() { return bucket; }
    public void setBucket(String bucket) { this.bucket = bucket; }
    public boolean isBucketPublic() { return bucketPublic; }
    public void setBucketPublic(boolean bucketPublic) { this.bucketPublic = bucketPublic; }
}
