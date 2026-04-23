# Ollama Prompts

## Subject Detection
**ID:** subject
Used to analyze text and identify the main subject/topic.

**Variables:**
- `{text}` - The analysis text (first 1000 chars)

**Prompt:**
```
[SYSTEM: You MUST respond with ONLY valid JSON. No explanation. No text. Just JSON.]
Extract the main subject from this text in JSON format:
TEXT: {text}
FORMAT: {"subject":"TOPIC_NAME"}
RESPOND NOW:
```

---

## Mentor Generation
**ID:** mentor
Creates a role descriptor used to filter and contextualize teaching content.

**Variables:**
- `{subject}` - The course subject

**Prompt:**
```
[SYSTEM: Respond ONLY with valid JSON. No explanation.]
Create a role descriptor for someone who teaches: {subject}
Describe their role and years of experience only. No personality. No style.
FORMAT: {"mentor":"ROLE with X years of experience in FIELD"}
EXAMPLE: {"mentor":"Backend developer with 5 years of experience building company websites"}
RESPOND NOW:
```

---

## Resources Extraction
**ID:** resources
Extracts 6 key concepts from learning material.

**Variables:**
- `{mentor}` - The mentor role descriptor
- `{subject}` - The course subject
- `{text}` - The analysis text (first 2000 chars)

**Prompt:**
```
[SYSTEM: Respond ONLY with valid JSON. No explanation.]
You are a {mentor} teaching {subject}. Extract the 6 main concepts someone needs to learn {subject} from this text:
{text}
FORMAT: {"raw":"important sparts"}
RESPOND NOW:
```

---

## Test Generation
**ID:** test
Generates 3 multiple-choice questions about a topic.

**Variables:**
- `{mentor}` - The mentor role descriptor
- `{subject}` - The course subject
- `{concepts}` - Key concepts (first 200 chars)

**Prompt:**
```
[SYSTEM: Respond ONLY with valid JSON. No explanation.]
You are a {mentor} teaching {subject}. Create 3 multiple choice questions covering the main concepts someone needs to learn {subject}.
Concepts: {concepts}
FORMAT: {"questions":[{"text":"Q?","answers":[{"id":"a","text":"A"},{"id":"b","text":"B"},{"id":"c","text":"C"},{"id":"d","text":"D"}],"rightAnswerId":"a"}]}
RESPOND NOW:
```

---

## Notes
- All prompts must return ONLY valid JSON
- No explanatory text before or after JSON
- Variables are wrapped in `{curly braces}`
- Each prompt has a unique ID for reference
- `resources` and `test` require `{mentor}` and `{subject}` to be resolved first