#!/bin/bash

# Get the latest commit message that contains "AB#X"
work_item_id=$(git log --format=%B -n 1 | grep -oE 'AB#[0-9]+' | head -n 1)

# Get a summary of changed files
changed_files=$(git diff --name-only HEAD~1)
file_count=$(echo "$changed_files" | wc -l)

# Format the file list for the commit message
file_list=$(echo "$changed_files" | tr '\n' ', ' | sed 's/, $//')

# Construct the commit message
commit_message="$work_item_id: Modified $file_count files (e.g., $file_list)"

echo "Generated commit message:"
echo "$commit_message"
