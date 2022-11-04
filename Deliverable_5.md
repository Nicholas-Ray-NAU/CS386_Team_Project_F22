# Description
Provide 1-2 paragraphs to describe your system. This will help understand the context of your design decisions. You can reuse and update text from the previous deliverables.

Grading criteria (2 points): Completeness; Consistency with the rest of the document; Adequate language.

# Architecture
Present a diagram of the high-level architecture of your system. Use a UML package diagram to describe the main modules and how they interrelate. See some examples at:
https://www.uml-diagrams.org/package-diagrams-examples.html 
Make clear the layers of your architecture (if they exist) as described in:
https://www.uml-diagrams.org/multi-layered-application-uml-model-diagram-example.html 
Provide a brief rationale of your architecture explaining why you designed it that way. 

Grading criteria (5 points): Adequate use of UML; Adequate design of an architecture for the system; Adequate description of the rationale.

# Class diagram
Present a refined class diagram of your system, including implementation details such as visibilities, attributes to represent associations, attribute types, return types, parameters, etc. The class diagram should match the code you have produced so far, but not be limited to it (e.g., it can contain classes not implemented yet). 

The difference between this class diagram and the one that you presented in D.3 is that the last focuses on the conceptual model of the domain while the former reflects the implementation. Therefore, the implementation details are relevant in this case. 

Grading criteria (6 points): Adequate use of UML; Adequate choice of classes and relationships; Completeness of the diagram; Adequate presentation of implementation details. 

# Sequence diagram
![Sequence Diagram](Images/D5_SequenceDiagram.jpg)

## Use Case Description
**Use Case:** User Creates an account/profile  
**Actor:** User  
**Description:** User attempts to create/access a profile with provided user data (username and profile)  
**Preconditions:** User is connected to server  
**Postconditions:** User will have a profile assigned to their username  
**Main Flow:**  
- User will travel to login page
- User will choose to create a new account
- Server will initialize user data to default values
- User will provide username and password
- Server will verify proper data input
- Database will be updated with new profile  
**Alternative Flow:**  
- User already has an account
  - User can view profile data
  - User can update attempt to update username
- User provides bad username or password
  - Server will notify user of bad input
  - Server will redo request for proper input


# Design Patterns
Split this section into 2 subsections. For each subsection, present a UML class diagram showing the application of a design pattern to your system (a different pattern for each section). Each class diagram should contain only the classes involved in the specific pattern (you don’t need to represent the whole system). Choose patterns from two different categories: Behavioral, Structural, and Creational. You are not limited to design patterns studied in class. 

Your system may not be appropriate for any design pattern. In this case, for didactic purposes, be creative and extend a little bit the scope of your system to make the design patterns appropriate. 

Implement each design pattern in your system and provide GitHub links to the corresponding classes

Grading criteria (6 points, 3 each pattern): Correct use of the design pattern as described in the literature; Adequate choice of the design pattern; Adequate implementation of the design pattern.

# Design Principles
How does your design observe the SOLID principles? Provide a short description of followed principles giving concrete examples from your classes. 

Grading criteria (6 points): Show correct understanding of SOLID principles; Provide enough details to justify how the principles were observed.
