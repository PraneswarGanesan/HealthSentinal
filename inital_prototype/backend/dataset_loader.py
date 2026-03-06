import pandas as pd
from backend.logger import logger

def chunk_text(text, size=120):

    words = text.split()
    chunks = []

    for i in range(0, len(words), size):
        chunk = " ".join(words[i:i+size])
        chunks.append(chunk)

    return chunks


def load_documents(path):

    logger.info("Loading dataset...")

    df = pd.read_csv(path)

    logger.info(f"Dataset loaded with {len(df)} records")

    docs = []

    for _, row in df.iterrows():

        text = f"""
        Description: {row['description']}
        Specialty: {row['medical_specialty']}
        Sample: {row['sample_name']}
        Notes: {row['transcription']}
        Keywords: {row['keywords']}
        """

        chunks = chunk_text(text)

        docs.extend(chunks)

    logger.info(f"Total document chunks created: {len(docs)}")

    return docs