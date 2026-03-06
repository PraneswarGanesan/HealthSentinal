from job_queue.job_queue import push_job, pop_job, get_queue_size
from utils.logger import get_logger


logger = get_logger("redis_test")


def run_test():

    print("\nTesting Redis Queue...\n")

    job = {
        "task": "index_document",
        "user_id": "test-user",
        "document_id": "doc123"
    }


    # Push job
    push_job(job)

    size = get_queue_size()
    print("Queue size after push:", size)


    # Pop job
    popped = pop_job()

    print("Popped job:", popped)


    size_after = get_queue_size()
    print("Queue size after pop:", size_after)


    logger.info("Redis queue test completed successfully")


if __name__ == "__main__":
    run_test()