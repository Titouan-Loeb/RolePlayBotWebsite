#!/bin/bash

# Run the command with a timeout
timeout 10s npm run start

# Capture the exit status of the timeout command
timeout_exit_status=$?

# Check if the exit status is 124 (timeout)
if [ $timeout_exit_status -eq 124 ]; then
    echo "Command timed out after 10 seconds > project is working"
    # Set a custom exit code (0 in this case)
    exit 0
fi

# For other exit statuses, maintain the original exit status
exit $timeout_exit_status
