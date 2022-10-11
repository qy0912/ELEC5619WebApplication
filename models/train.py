import pandas as pd
import numpy as np
# config
# labels = ['spam', 'ham']
def cat(label, labels):
    cats = {}
    for i in labels:
        if i == label:
            cats[i] = True
        else:
            cats[i] = False
    return cats
# Loading the spam data
# ham is the label for non-spam messages
spam = pd.read_csv('data.csv')
# print(spam.head(10))
labels = np.unique(spam['label'])

import spacy

# Create an empty model
nlp = spacy.blank("en")

# Add the TextCategorizer to the empty model
textcat = nlp.add_pipe("textcat")


# Add labels to text classifier
for i in labels:
    textcat.add_label(i)

train_texts = spam['text'].values

train_labels = [{'cats': cat(label, labels)} 
                for label in spam['label']]

train_data = list(zip(train_texts, train_labels))

from spacy.util import minibatch
from spacy.training.example import Example

spacy.util.fix_random_seed(1)
optimizer = nlp.begin_training()

# Create the batch generator with batch size = 8
batches = minibatch(train_data, size=8)
# Iterate through minibatches
for batch in batches:
    # Each batch is a list of (text, label) 
    for text, labels in batch:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, labels)
        nlp.update([example], sgd=optimizer)


import random

random.seed(1)
spacy.util.fix_random_seed(1)
optimizer = nlp.begin_training()

losses = {}
for epoch in range(10):
    random.shuffle(train_data)
    # Create the batch generator with batch size = 8
    batches = minibatch(train_data, size=1)
    # Iterate through minibatches
    for batch in batches:
        for text, labels in batch:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, labels)
            nlp.update([example], sgd=optimizer, losses=losses)
    print(losses)

texts = ["hello",
         "help" ]
docs = [nlp.tokenizer(text) for text in texts]

# Use textcat to get the scores for each doc
textcat = nlp.get_pipe('textcat')
scores = textcat.predict(docs)

print(scores)


predicted_labels = scores.argmax(axis=1)
print([textcat.labels[label] for label in predicted_labels])

nlp.to_disk("model.pth")