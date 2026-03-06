## Testing the database connection 
make sure you have the .env file configured in the utils package and tested as instrcuted in the folder 
if your are in here i belive you have succusfully done that now its time to test the things is working or not while developing 
step 1 : Make self you are inside the  proto_2 folder and run the below command.


```
python -m dataBase.test_db
```

## Expected output
```

Testing Supabase connection...

User inserted: [{'id': '8747b4a4-afd3-4df8-8fe2-950bb6ea9854', 'email': 'test_user@example.com', 'password_hash': 'fake_hash_for_test', 'created_at': '2026-03-06T13:18:20.405932+00:00'}]
Fetched user: {'id': '8747b4a4-afd3-4df8-8fe2-950bb6ea9854', 'email': 'test_user@example.com', 'password_hash': 'fake_hash_for_test', 'created_at': '2026-03-06T13:18:20.405932+00:00'}
2026-03-06 18:48:18 | INFO | __main__:run_test:26 | Database test successful
(venv)
```
