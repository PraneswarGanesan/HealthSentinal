## S3 Configuration
In this module we will be using the s3 bucket for storage  and retival when we the documents comes from the user side it is gonna be stored in this s3 bucket on the aws .
And make sure you are inside the proto_2 folder.

```
python -m storage.test_s3
```
run this command to verfiy the things
## Expected output
If you got the below output then you are good to go
```

Testing S3 connection...

Upload path: users/test-user/documents/test_file.txt
2026-03-06 18:54:53 | INFO | storage.s3_client:upload_file:49 | File uploaded to S3: users/test-user/documents/test_file.txt
Upload successful
2026-03-06 18:54:54 | INFO | storage.s3_client:download_file:72 | File downloaded from S3: users/test-user/documents/test_file.txt
Downloaded content: Hello from HealthSentinel S3 test
2026-03-06 18:54:54 | INFO | storage.s3_client:delete_file:95 | S3 object deleted: users/test-user/documents/test_file.txt
Delete successful
2026-03-06 18:54:54 | INFO | __main__:run_test:45 | S3 storage test completed successfully
(venv)
```