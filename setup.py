"""
Hello World app for running Python apps on Bluemix
"""

# Always prefer setuptools over distutils
from setuptools import setup, find_packages
# To use a consistent encoding
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='money-analy$er',
    version='1.0.0',
    description='Python project to analyse money via image with IBM Watson',
    long_description=long_description,
    url='https://github.com/JMGama',
    license='Apache-2.0'
)
