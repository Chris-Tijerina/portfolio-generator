const inquirer = require("inquirer");

// const fs = require("fs");
// const generatePage = require("./src/page-template");

// const  pageHTML = generatePage(name, github);

// Inquirer based prompts for user questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      validate: gitInput => {
        if (gitInput) {
          return true;
        } else {
          console.log("Please enter your GitHub Username!");
          return false;
        }
      }
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:"
    }
  ])
};

// Inquirer based prompts for questions about the project
const promptProject = portfolioData => {

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: projectNameInput => {
        if (projectNameInput) {
          return true;
        } else {
          console.log("Please enter your project name!");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescriptionInput => {
        if (projectDescriptionInput) {
          return true;
        } else {
          console.log("Please describe your project!");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: projectLinkInput => {
        if (projectLinkInput) {
          return true;
        } else {
          console.log("Please provide your project link!");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })
};

// call the functions and chain the promises to output as console logs
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });

// fs.writeFile("./index.html", pageHTML, err => {
//   if (err) throw err;

//   console.log("portfolio complete! Check out index.html to see the output!")
// })

