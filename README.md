[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7201456&assignment_repo_type=AssignmentRepo)
### task:

create a project to allow any user to upload images and these images should be shown as a gallery.

the project should have two routes:

- / main route will contain a inputs to upload images:

  - image name input
  - category select input: nature, animals, people, food, technology, etc.
  - image description input
  - image upload button
 - /images route will contain a gallery of all the images uploaded.

the app should save the image file on a folder /public/uploads/ and also should save image details to mongodb database with this properties:

 - image name
 - image category
 - image description
 - image url

the image file name should be changed to saved object id on database and with this way we will make sure that the image name is unique

