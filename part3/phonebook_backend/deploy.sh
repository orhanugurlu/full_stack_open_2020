#!/bin/bash
cd ../..
git push heroku/phonebook_backend `git subtree split --prefix part3/phonebook_backend master`:refs/heads/master --force
