package personalProjects;

import java.util.Scanner;

public class GlenforestActivityPointsAwards1 {
	/*
	 * About the program The Glenforest Points System recognizes a student’s
	 * contribution to all aspects of school life throughout her/his years at
	 * Glenforest Secondary School. One point is awarded per hour of the activity,
	 * up to a maximum of 75 points. 30 points for winning the Glenforest pride
	 * award.
	 * 
	 */
	// Methods
		// sum
	public static int sum(double academicPoints, double awardPoints, int clubPoints) {
		double gradePoints = academicPoints + awardPoints + clubPoints;
		return (int) gradePoints;
	}
		//moreNeeded
	public static int moreNeeded(double awardsRequirments, double totalPoints)  {
		 double moreNeeded = awardsRequirments-totalPoints;
		return (int) moreNeeded;
	}

	public static void main(String[] args) {
		
		// Variables
		int gradeStartedGFSS = 0, awards, AmountOfClubs, courses = 0, passedCourses, totalCourses;
		int passingMarks = 0, clubPoints = 0;
		double awardPoints, academicPoints, hours, totalHours = 0, gradePoints = 0, totalPoints = 0;
		double average = 0, totalAverage=0, mark, moreNeeded = 0, awardsRequirments=0;
		boolean correctGradeInput = false, correctOptionInput = false, correctOptionInput2=false, inputExit=false;
		String userInput = null, temp, descriptionInput;// Anything temporary goes in there
		
		// Init scanner
		Scanner input = new Scanner(System.in);
		
		//Prompt user if they want be explained
		System.out.print("Would you like a brief description of the Glenforest Points System?(y/n): ");
		descriptionInput = input.nextLine();
		
		if (descriptionInput.equals("y")||descriptionInput.equals("Y")||descriptionInput.equals("Yes")||descriptionInput.equals("yes")||descriptionInput.equals("YES")) {
			System.out.print(
					"The Glenforest Points System recognizes a student’s contribution to all aspects of school life \nthroughout her/his years at Glenforest Secondary School.\n");
			System.out.println(
					"Co-curricular Points or Extra-Curricular points are awarded for participation in school \nactivities such as clubs, sports teams, and school councils.");
			System.out.println("One point is awarded per hour of the activity, up to a maximum of 75 points.");
			System.out.println(
					"Academic Points are awarded in the year of graduation. Students receive 1⁄4 point for \neach passing mark on their transcript. For example, a mark of 6 generates 17 points.\n");
			System.out.println(
					"Graduation Awards – the following awards are presented at Commencement to Graduates \nwho have earned all 3 certificates (300 + points) and include the graduate’s academic points:");

		}

		// Prompt user
		// Prompt when began at GFSS to calculate how many years they went their
		System.out.print("In what grade did you begin going to Glenforest Seconday School?(whole numbers): ");
		while (correctGradeInput != true) {
			gradeStartedGFSS = input.nextInt();
			if (gradeStartedGFSS == 9 || gradeStartedGFSS == 10 || gradeStartedGFSS == 11 || gradeStartedGFSS == 12) {
				correctGradeInput = true;
			} else {
				System.out.println("Incorrect input");
				System.out.println(" In what grade did you begin going to Glenforest Seconday School?: ");
			}
		}
		// Ask for how many clubs/teams/councils they were apart of at their time at
		// Glenforest
		System.out.print("How many club/teams/councils were you apart of at your time at Glenforest?: ");
		AmountOfClubs = input.nextInt();
		if(AmountOfClubs>0) {//This string only gets created if the user is a part of clubs so that
			String[] clubsAtTimeAtGlenforest = new String[AmountOfClubs];//an error does not appear
		}

		// Variables continued
		int yearsAtGFSS = 13 - gradeStartedGFSS;

		// Arrays
		int[] grades = new int[yearsAtGFSS];
		String[] clubsAtTimeAtGlenforest = new String[AmountOfClubs];
		double[] pointsPerGrade = new double[yearsAtGFSS];
		int[] awardsPerGrade = new int[yearsAtGFSS];
		double[] hoursPerGrade = new double[yearsAtGFSS];
		int[] CoursesPerGrade = new int[yearsAtGFSS];
		int[] passedCoursesPerGrade = new int[yearsAtGFSS];
		double[] averagesPerGrade = new double[yearsAtGFSS];

		System.out.println("Grades started: " + gradeStartedGFSS);
		System.out.println("Years at GFSS: " + yearsAtGFSS);
		System.out.println("Clubs during time at GFSS: " + AmountOfClubs);

		// Assign grades to list
		for (int i = 0; i < yearsAtGFSS; i++) {
			grades[i] = gradeStartedGFSS + i;
		}
		if(AmountOfClubs>0) {
			for (int i = 0; i < AmountOfClubs; i++) {
				System.out.print("Enter club " + (i + 1) + "'s name: ");
				clubsAtTimeAtGlenforest[i] = input.nextLine();
			}
		// Its skipping club 1 so re-prompt user
		System.out.println("Error with club 1 input");
		System.out.println("Enter name of club 1: ");
		clubsAtTimeAtGlenforest[0] = input.nextLine();
		}
		

		/*
		 * Ask the user information about each grade in for loop. The loop will loop for
		 * the amount of grades at Glenforest First begin by asking for the amount of
		 * courses they took. Store the # of courses in CoursesPerGrade [] Then ask for
		 * average. Store the average in averagesPerGrade[]. Ask them for the amount of
		 * courses they passed. If they don't know you loop for the amount of time
		 * courses they took. For each course passed passingMarks++. Then calculate the
		 * academic points then
		 */
		for (int i = 0; i < yearsAtGFSS; i++) {
			// Put variables into original position
			awards = 0;
			courses = 0;
			passedCourses = 0;
			passingMarks = 0;
			clubPoints = 0;
			awardPoints = 0;
			academicPoints = 0;
			hours = 0;
			gradePoints = 0;
			average = 0;
			mark = 0;
			correctOptionInput = false;
			userInput = null;
			temp = null;// Anything temporary goes in there
			correctOptionInput2=false;
			// Courses
			System.out.println("Now its time to to enter the average for " + grades[i] + ".");// Prompt user
			System.out.println(
					"Would you like to enter the  mark for each grade mannually of just enter one number(the average)?");
			System.out.println(
					"Input 'A' to enter each mark for each courses taken that grade or input 'B' to enter one number.");
			System.out.print("Enter option: ");
			while (correctOptionInput != true) {// Continuously ask user input until its A or B
				userInput = input.nextLine();
				if (userInput.equals("A") || userInput.equals("B") || userInput.equals("a") || userInput.equals("b")) {
					correctOptionInput = true;
				} else {
					correctOptionInput = false;
				}
			}
			if (userInput.equals("A") || userInput.equals("a")) {
				System.out.println("How many courses did you take in grade " + grades[i] + "?: ");
				courses = input.nextInt();// take input
				CoursesPerGrade[i] = courses;
				for (int j = 0; j < courses; j++) {
					System.out.println("Input your mark for course " + (j + 1) + ": ");
					mark = input.nextInt();
					average += mark;// Add mark to average
					if (mark >= 50) {
						passingMarks++;
					}
				}
				average = average / courses;
			} else if (userInput.equals("B") || userInput.equals("b")) {
				System.out.print("How many courses did you take in grade " +grades[i]+"?: ");
				courses = input.nextInt();
				CoursesPerGrade[i] = courses;
				while(correctOptionInput2!=true) {
					System.out.print("How many courses did you pass?: ");
					passingMarks = input.nextInt();
					if(passingMarks>courses) {
						correctOptionInput2=false;
						System.out.println("Incorrect input. ");
					}else {
						correctOptionInput2 = true;
					}
				System.out.print("Enter your average for grade " + grades[i] + ": ");
				average = input.nextDouble();// get average
	
				}
			}
			// Calculate academic points
			academicPoints = ((average * passingMarks) / 4) + ((average * passingMarks) % 4);

			// Awards
			System.out.print("How many Gryphon Pride Awards did you win in grade " + grades[i] + "?: ");
			awards = input.nextInt();
			// calculate award points
			awardPoints = awards * 30;
			
				// Clubs
			if(AmountOfClubs>0) {
				for (int j = 0; j < AmountOfClubs; j++) {
					System.out.print("For how many hours did you participate in " + clubsAtTimeAtGlenforest[j]
							+ " in grade " + grades[i] + "?: ");
					hours = input.nextDouble();
					if (hours > 75) {
						hours = 75;// Max is 75 hours
					}
					totalHours += hours;
				}
				clubPoints += totalHours;
			}
			// ADD all information to array
			awardsPerGrade[i] = awards;
			hoursPerGrade[i] = totalHours;
			CoursesPerGrade[i] = courses;
			passedCoursesPerGrade[i] = passingMarks;
			averagesPerGrade[i] = average;
			pointsPerGrade[i] = sum(academicPoints, awardPoints, clubPoints);

		}
		
		
		//Calculate total average
		for(int i=0; i<yearsAtGFSS; i++) {
			totalAverage+=averagesPerGrade[i];
		}
		totalAverage= totalAverage/yearsAtGFSS;
		
		//Calculate total points
		for(int i=0; i<yearsAtGFSS;i++) {
			totalPoints+=pointsPerGrade[i];
		}

		
		//Calculation complete
		System.out.println("Culculation complete");
		while(inputExit!=true) {
			System.out.println("What would you like to see? ");
			System.out.println("Here are your options: ");
			System.out.println("1. Show me lists of all the information.");
			System.out.println("2. Show me information per grade");
			System.out.println("3. Show me my total average for your "+yearsAtGFSS+" years at Glenforest.");
			System.out.println("4. Show me my total accumilated points.");
			System.out.println("5. Show me which awards I have won.");
			System.out.println("6. Show me how many more points I need to win awards.");
			System.out.println("Please enter the option number(1, 2, 3, etc) or enter exit to exit program.");
			System.out.print("Option chosen: ");
			userInput=input.nextLine();
			if(userInput.equals("1")) {
				// Print all lists
				System.out.println("All lists");
				// Grades
				System.out.print("Grades");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(grades[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Clubs
				if(AmountOfClubs>0) {
					System.out.println(" ");
					System.out.print("Clubs");
					System.out.print("[ ");
					for (int i = 0; i < AmountOfClubs; i++) {
						System.out.print(clubsAtTimeAtGlenforest[i]);
						System.out.print(", ");
					}
				System.out.print("]");
				System.out.println(" ");
				}
				// Points
				System.out.print("Points per Grade");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(pointsPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Awards
				System.out.print("Awards per grade");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(awardsPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Hours
				System.out.print("Hours");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(hoursPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Courses
				System.out.print("Courses Per Grade");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(CoursesPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Passed Courses
				System.out.print("Passed Courses Per Grade");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(passedCoursesPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");

				// Averages
				System.out.print("Averages");
				System.out.print("[ ");
				for (int i = 0; i < yearsAtGFSS; i++) {
					System.out.print(averagesPerGrade[i]);
					System.out.print(", ");
				}
				System.out.print("]");
				System.out.println(" ");
			}
			else if(userInput.equals("2")) {
				//Information by grade format
				System.out.println("Information per grade");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print("\t"+gradeStartedGFSS+"\t");
					gradeStartedGFSS++;
				}
				System.out.println(" ");
				//Marks
				System.out.print("Averages: \t");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print(averagesPerGrade[i]+"\t");
				}
				System.out.println(" ");
				//Courses
				System.out.print("Courses: \t");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print(CoursesPerGrade[i]+"\t");
				}
				System.out.println(" ");
				//Passed Courses
				System.out.print("Courses per grade: \t");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print(passedCoursesPerGrade[i]+"\t");
				}
				System.out.println(" ");
				
				//Hours
				System.out.print("Hours: \t");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print(hoursPerGrade[i]+"\t");
				}
				System.out.println(" ");
				
				//Awards
				System.out.print("Awards: ");
				for(int i=0;i<yearsAtGFSS;i++) {
					System.out.print(awardsPerGrade[i]+"\t");
				}
				System.out.println(" ");
			}
			else if(userInput.equals("3")) {
				System.out.println("Average for your "+yearsAtGFSS+" years at Glenforest: "+totalAverage);
			}
			else if(userInput.equals("4")) {
				System.out.println("Total points accumilated in "+yearsAtGFSS+" years at Glenforest S.S: "+totalPoints);			
			}
			
			else if(userInput.equals("5")) {
				System.out.println("Your total points are " + totalPoints);
				if(totalPoints >= 1600) {
					System.out.println("You get an acryllic plaque! Congratulations, you have achieved the highest reward possible!");
					}
				else if(totalPoints >= 1200 && totalPoints < 1600) {
					System.out.println("You get a GFSS a large GFSS Medallion in a case!");			
				}
				else if(totalPoints >= 800 && totalPoints < 1200) {
					System.out.println("You get a GFSS medallion on a ribbon!");
				}
				else if (totalPoints >= 300 && totalPoints < 800) {
					System.out.println("You get a gold certificate!");
				}
				else if (totalPoints >= 200 && totalPoints < 299) {
					System.out.println("You get a silver certificate!");
				}
				else if (totalPoints>= 100 && totalPoints < 200 ) {
					System.out.println("You get a bronze certificate!");
				}else {
					System.out.println("You get nothing.");
				}
			}
			else if(userInput.equals("6")) {
				System.out.println("Your total points are " + totalPoints);
				if (totalPoints < 200 ) {
					awardsRequirments=100;
					moreNeeded(totalPoints, awardsRequirments);
					System.out.println("You need "+moreNeeded+" to win a bronze certificate.");
				}
				else if (totalPoints < 300) {
					awardsRequirments=200;
					moreNeeded(totalPoints, awardsRequirments);
					System.out.println("You need "+moreNeeded+" to win a silver certificate.");				}
				else if (totalPoints < 800) {
					awardsRequirments=300;
					moreNeeded(totalPoints, awardsRequirments);
					System.out.println("You need "+moreNeeded+" to win a gold certificate.");
				}
				else if(totalPoints < 1200) {
					awardsRequirments=800;
					moreNeeded(totalPoints, awardsRequirments);
					System.out.println("You need "+moreNeeded+" to win a a GFSS medallion on a ribbon.");
				}
				else if(totalPoints < 1600) {
					awardsRequirments=1200;
					moreNeeded(totalPoints, awardsRequirments);
					System.out.println("You need "+moreNeeded+" to win a large GFSS medallion in a case.");
				}
				else if(totalPoints >= 1600) {
					System.out.println("You cannot get a higher achievement then an cryllic plaque! Congratulations, you have achieved the highest reward possible!");
					}
			}
			else if(userInput.equals("exit")||userInput.equals("Exit")) {
				System.out.println("Exit program.");
				input.close();
				inputExit=true;//Quits
			}else {
				System.out.println("Incorrect input.");
				System.out.println("Please retry.");
			}
		}

	}

}
//FINISH
