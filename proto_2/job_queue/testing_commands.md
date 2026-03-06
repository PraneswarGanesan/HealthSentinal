## Redis testing/
In this module we have implemented the redis job_queue.py which will be responsible for handling the request in order.
to testing the file make sure you are in the right folder 
```
proto_2
```
then open up the terminial and type this command
```
python -m queue.test_queue
```
## Expected Output
Once it succsfully ran means you should see this
```
(venv) PS E:\Skct\4th year 2025-2026\project(2)\HealthSentinal\proto_2> python -m job_queue.test_queue

Testing Redis Queue...

2026-03-06 19:07:54 | INFO | job_queue.job_queue:push_job:29 | Job pushed to queue: {'task': 'index_document', 'user_id': 'test-user', 'document_id': 'doc123'}
Queue size after push: 1
2026-03-06 19:07:54 | INFO | job_queue.job_queue:pop_job:53 | Job popped from queue: {'task': 'index_document', 'user_id': 'test-user', 'document_id': 'doc123'}
Popped job: {'task': 'index_document', 'user_id': 'test-user', 'document_id': 'doc123'}
Queue size after pop: 0
2026-03-06 19:07:54 | INFO | __main__:run_test:36 | Redis queue test completed successfully
(venv) PS E:\Skct\4th year 2025-2026\project(2)\HealthSentinal\proto_2> 
```