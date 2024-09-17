# replit_setup.sh
# This shell script sets up environment variables for a Replit project.

# Get the Replit URL
REPL_URL=$(echo $REPLIT_SUBDOMAIN.$REPL_OWNER.repl.co)

# Update the secret
echo "export NEXT_PUBLIC_API_URL=https://$REPL_URL" >> ~/.replit_secrets