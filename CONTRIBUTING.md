# Contributing to Awesome GitHub Profile README Templates Reborn

Welcome! We're excited you want to contribute to our collection of awesome GitHub profile READMEs. This is a fantastic place to make your first open-source contribution!

We value every contribution, and by adding your template, you help others find inspiration for their own profiles.

## How to Contribute

To ensure a smooth process, please follow these steps:

### Step 1: Get Your Local Copy Ready

1. **Fork** this repository.
2. **Clone** your fork to your local machine:

 ```bash
 git clone [https://github.com/YOUR-USERNAME/awesome-github-profile-readme-templates-reborn.git](https://github.com/YOUR-USERNAME/awesome-github-profile-readme-templates-reborn.git)
 ```

3. **Create a new branch** for your changes. Use a descriptive name:

  ```bash
  git checkout -b add-your-username
  ```

### Step 2: Add Your README Template

1. Navigate to the `src/templates/` folder.
2. Create a **new Markdown file**.
3. The filename **must** be your GitHub username, followed by `.md`.
  * *Example:* `funatsuya.md`

4. Copy and paste the content of your GitHub profile README into this new file.
5. **Important:** At the very **bottom** of the file, you must add a credit link pointing back to your profile. Use a horizontal rule (`---`) to separate it from your content:

  ```markdown
  ---
  <a href="https://github.com/YOUR-USERNAME">
  <img src="https://img.shields.io/badge/Credit-YOUR-USERNAME-blue?style=flat&logo=github" alt="Credit: YOUR-USERNAME">
  </a>
  ```

### Step 3: Save and Submit

1. Save your file.
2. Commit your changes with a clear message that includes your username:

  ```bash
  git add .
  git commit -m "Add template: YOUR-USERNAME"
  ```

3. Push your new branch to your fork on GitHub:

  ```bash
  git push origin add-your-username
  ```

4. Go to the original repository on GitHub and **submit a Pull Request (PR)**.

### Step 4: Checks and Review

Once you submit your PR, a series of automated checks will run.

* **Please ensure your PR passes all checks:**
  * `✅ Link Checker:` Verifies that all links in your README are working and not broken.
  * `✅ Markdown Linter:` Checks for formatting errors in your Markdown file.

A maintainer will review your submission. We may request changes to ensure quality and consistency. Once approved, your template will be merged!

---

## Other Ways to Contribute

Don't want to add a template? You can also help by:

* **Reporting bugs** or broken links by [opening an issue](https://github.com/funatsuya/awesome-github-profile-readme-templates-reborn/issues).
* **Suggesting new features** for the template viewer.

Thank you for your contribution!