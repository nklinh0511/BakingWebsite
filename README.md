    Running Backend
  Downloading Necessary Software
 ** Install MySQL**
      During installation create a username and password (remember it!!)
      Create a database - No need to create tables(You will not see any tables until you run spring and the frontend)
**  Download and install Maven**
      Make sure you have Spring Boot Support with your IDE
	
** VS Code has an extension, Eclipse has you install it in the marketplace**
    Download files or Clone repository from Git
    https://github.com/nklinh0511/BakingWebsite.git
	
   **Open project in IDE**
    Change application properties file
    You will need to change the username and password to the username and password you made while installing MySQL
    You will need to change the last part of the URL to the name of the database you created

  **Run StudentsystemApplication**
    This will run on http://localhost:8080
    If run correctly you will see hello printed on the console and Tomcat started on port(s): 8080 
    If you get an error saying that 8080 is already in use, you can kill it by typing npx kill-port 8080 in the terminal and rerun


      Running Frontend
 ** Download the necessary software**
    Install Nodejs and npm in your system

 ** Open a new terminal**
    Type cd (folder name) into the terminal until your are in the frontEnd folder
    Type in the terminal npm run dev
    A local host link should pop up - open it (Make sure the port that appears in the local hosts matches the one declared in the WebConfig.java)

