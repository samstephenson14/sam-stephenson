"""
ask_sam.py — the first experiment.

Ask Claude a question, give it a short bio of Sam as context, and
print back the answer. Run it like this:

    python3 ask_sam.py "What does Sam do for work?"
"""

import os
import sys

from anthropic import Anthropic
from dotenv import load_dotenv

# load_dotenv() reads the .env file sitting next to this script and
# copies its values into the environment for this program to use.
load_dotenv()

api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    print("Missing ANTHROPIC_API_KEY.")
    print("Copy .env.example to .env and fill in your real key.")
    sys.exit(1)

client = Anthropic(api_key=api_key)

# A short bio Claude will answer questions from. This is the only
# information it's allowed to use about Sam for now.
SAM_BIO = """
Sam Stephenson is a Project Manager based in Montreal, working in
fintech and travel (risk operations, chargeback and fraud prevention).
He spent six years in the US Air Force as an intelligence analyst.
He speaks English, Persian Farsi, Afghan Dari, and French.
"""

# Take the question from the command line, e.g.:
#   python3 ask_sam.py "Where is Sam based?"
# sys.argv is the list of words typed after "python3 ask_sam.py".
question = " ".join(sys.argv[1:]) or "What does Sam do for work?"

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    system=f"Answer questions about Sam Stephenson factually, using only this bio:\n{SAM_BIO}",
    messages=[{"role": "user", "content": question}],
)

print(response.content[0].text)
