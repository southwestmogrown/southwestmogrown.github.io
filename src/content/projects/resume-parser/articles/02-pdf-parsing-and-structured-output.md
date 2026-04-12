# PDF Parsing and Structured Output

Getting clean text out of a PDF resume is harder than it sounds. PDFs are layout formats, not text formats. A two-column resume layout can produce interleaved text when extracted naively — left column line 1, right column line 1, left column line 2... — which confuses downstream LLM processing.

![Resume Parser demo screen](/assets/images/projects/resume-parser/Resume-Parser-Demo-Screen.png)

## Extraction Strategy

Resume Parser uses `pdf-parse` on the server to extract raw text from uploaded PDFs. The extraction result is a flat string with no formatting. Before passing it to Claude, a normalization step:

1. Strips excess whitespace and blank lines
2. Identifies and removes page headers/footers (typically repeated lines)
3. Re-joins hyphenated line breaks that occur at PDF column edges

The result isn't perfect, but it's consistent enough for Claude to interpret correctly. Claude handles the remaining ambiguity — it understands that "Sr. Soft- ware Engineer" is "Sr. Software Engineer" without needing explicit normalization.

## File Handling

PDFs are uploaded as multipart form data via the Next.js route handler. The file never touches disk — it's processed as a Buffer in memory and discarded after extraction. This keeps the server stateless and avoids the complexity of managing temporary file storage.

File size is validated before extraction (max 5MB). Files above the limit return a 413 error with a user-facing message rather than attempting extraction and failing mid-process.

## Output Validation

After the first Claude pass, the extracted profile JSON is validated with Zod:

```ts
const CandidateProfileSchema = z.object({
  name: z.string(),
  currentTitle: z.string().optional(),
  yearsExperience: z.number(),
  skills: z.array(z.string()),
  experience: z.array(ExperienceEntrySchema),
  education: EducationSchema.optional(),
  accomplishments: z.array(z.string()),
})
```

Validation errors surface to the user as "Could not parse this resume format" — indicating that the PDF format was too unusual to extract reliably, and suggesting they try a plain-text version.
