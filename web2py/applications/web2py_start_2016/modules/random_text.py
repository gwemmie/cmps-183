import random
from gluon.utils import web2py_uuid

VOWELS = 'aeiouy'
CONSONANTS = 'bcdfgmnpqrstvwz'

def get_random_word(length=6):
    """Produces a random word"""
    # We initialize the random number generator in a safe way, to guarantee random sequences
    # even in the cloud on cloned hosts.
    r = random.Random(web2py_uuid())
    s = ''
    for j in range(length / 2):
        s += r.choice(CONSONANTS) + r.choice(VOWELS)
    return s

def get_random_paragraph(num_words=50):
    """Generates a random paragraph."""
    r = random.Random(web2py_uuid())
    wlist = [get_random_word(length=r.choice([2, 4, 6, 8])) for _ in range(num_words)]
    return ' '.join(wlist)

def get_random_number(maxval=100):
    r = random.Random(web2py_uuid())
    return r.randint(0, maxval)

def get_random_title():
    return get_random_paragraph(num_words=4)
