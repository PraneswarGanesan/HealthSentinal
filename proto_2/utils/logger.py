import sys
from loguru import logger


def get_logger(name: str):

    logger.remove()

    logger.add(
        sys.stdout,
        format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {name}:{function}:{line} | {message}",
        level="INFO"
    )

    logger.add(
        "logs/app.log",
        rotation="10 MB",
        retention="10 days",
        compression="zip",
        level="INFO"
    )

    return logger.bind(module=name)