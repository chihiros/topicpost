#!/bin/bash
output=$(supabase status)

echo "# Supabase Environment Variables" > .env.supabase.local

# API URL
api_url=$(echo "$output" | grep "API URL" | awk '{print $3}')
echo "SUPABASE_API_URL=$api_url" >> .env.supabase.local

# GraphQL URL
graphql_url=$(echo "$output" | grep "GraphQL URL" | awk '{print $3}')
echo "SUPABASE_GRAPHQL_URL=$graphql_url" >> .env.supabase.local

# S3 Storage URL
s3_storage_url=$(echo "$output" | grep "S3 Storage URL" | awk '{print $4}')
echo "SUPABASE_S3_STORAGE_URL=$s3_storage_url" >> .env.supabase.local

# DB URL
db_url=$(echo "$output" | grep "DB URL" | awk '{print $3}')
echo "SUPABASE_DB_URL=$db_url" >> .env.supabase.local

# Studio URL
studio_url=$(echo "$output" | grep "Studio URL" | awk '{print $3}')
echo "SUPABASE_STUDIO_URL=$studio_url" >> .env.supabase.local

# Inbucket URL
inbucket_url=$(echo "$output" | grep "Inbucket URL" | awk '{print $3}')
echo "SUPABASE_INBUCKET_URL=$inbucket_url" >> .env.supabase.local

# JWT secret
jwt_secret=$(echo "$output" | grep "JWT secret" | awk '{print $3}')
echo "SUPABASE_JWT_SECRET=$jwt_secret" >> .env.supabase.local

# anon key
anon_key=$(echo "$output" | grep "anon key" | awk '{print $3}')
echo "SUPABASE_ANON_KEY=$anon_key" >> .env.supabase.local

# service_role key
service_role_key=$(echo "$output" | grep "service_role key" | awk '{print $3}')
echo "SUPABASE_SERVICE_ROLE_KEY=$service_role_key" >> .env.supabase.local

# S3 Access Key
s3_access_key=$(echo "$output" | grep "S3 Access Key" | awk '{print $4}')
echo "SUPABASE_S3_ACCESS_KEY=$s3_access_key" >> .env.supabase.local

# S3 Secret Key
s3_secret_key=$(echo "$output" | grep "S3 Secret Key" | awk '{print $4}')
echo "SUPABASE_S3_SECRET_KEY=$s3_secret_key" >> .env.supabase.local

# S3 Region
s3_region=$(echo "$output" | grep "S3 Region" | awk '{print $3}')
echo "SUPABASE_S3_REGION=$s3_region" >> .env.supabase.local

echo ".env.supabase.local file generated successfully"