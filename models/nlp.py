import spacy
nlp = spacy.load("model.pth")
textcat = nlp.get_pipe('textcat')







def process(texts):
    
    docs = [nlp.tokenizer(text) for text in texts]
    scores = textcat.predict(docs)
    predicted_labels = scores.argmax(axis=1)
    return [textcat.labels[label] for label in predicted_labels]

