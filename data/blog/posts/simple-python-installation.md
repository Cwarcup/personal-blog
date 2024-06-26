---
title: 'Setting Up Python on macOS: A Clean and Simple Approach'
date: '2024-06-25'
tags: ['macOS', 'Python']
draft: false
summary: This article covers the key points of setting up Python using Homebrew, creating virtual environments, and managing packages. It's straightforward and easy to follow, making it a great reference for future use. Feel free to modify or expand on any sections to better fit your personal style or to include any additional insights you found particularly useful during the process.
---

As a developer, having a clean and manageable Python environment is crucial. After trying various methods, I've found that using Homebrew to install Python on macOS offers the best balance of simplicity and functionality. In this article, I'll walk you through the process I used to set up Python on my Mac.


## Why Homebrew?

Homebrew is a package manager for macOS that makes installing and managing software incredibly easy. It integrates well with the system and provides a straightforward way to keep your packages updated.

## Step 1: Install Homebrew

If you don't have Homebrew installed, open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```



## Step 2: Install Python

With Homebrew installed, you can now install Python:

```bash
brew install python
```

This command installs the latest version of Python 3.

## Step 3: Verify the Installation

Check your Python installation:

```bash
python3 --version
which python3
pip3 --version
```

You should see output similar to:

```bash
Python 3.12.4
/opt/homebrew/bin/python3
pip 24.0 from /opt/homebrew/lib/python3.12/site-packages/pip (python 3.12)
```

## Step 4: Set Up Aliases

To use `python` instead of `python3` and `pip` instead of `pip3`, add these aliases to your `~/.zshrc` file:

```bash
echo 'alias python=python3' >> ~/.zshrc
echo 'alias pip=pip3' >> ~/.zshrc
```

Then, reload your shell:

```bash
source ~/.zshrc
```

## Step 5: Using Virtual Environments

For project-specific dependencies, use virtual environments. Here's how to create and use one:

```bash
python -m venv myproject
source myproject/bin/activate
```

To deactivate the environment when you're done:
    
```bash
deactivate
```

## Step 6: Installing Packages

With your virtual environment activated, you can install packages using pip:

```bash
pip install requests
```

To keep track of your project's dependencies:

```bash
pip freeze > requirements.txt
```

To install dependencies from a requirements.txt file:

```bash
pip install -r requirements.txt
```

## Conclusion

This setup provides a clean, simple, and effective Python environment on macOS. It's easy to manage and update, and using virtual environments ensures that your projects remain isolated and reproducible.

Remember to activate your virtual environment whenever you work on a project, and deactivate it when you're done. Happy coding!