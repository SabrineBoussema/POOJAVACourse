Create a premium, highly interactive, visually rich and pedagogically strong
university presentation for the course:

PROGRAMMATION ORIENTÉE OBJET
JAVA

LANGUAGE OF ALL SLIDES:
French.

SOURCE MATERIAL:
Use the attached files as the primary source of truth:

- CHAPITRE1-1.pdf
- CHAPITRE2-1.pdf
- Chap2.pptx

IMPORTANT:
Do NOT simply convert the source PDFs or PowerPoint into slides.

Rebuild the entire pedagogical experience.

Preserve:
- the concepts,
- examples,
- terminology,
- Java code,
- pedagogical progression,
- level of detail

contained in the supplied course.

You may correct obvious formatting and Java syntax presentation issues,
but do not silently replace the course with an unrelated curriculum.

The goal is to transform the current material into a modern university course
that feels engaging, dynamic and professional.

====================================================
PEDAGOGICAL PHILOSOPHY
====================================================

The course must follow this learning rhythm:

PROBLEM
→ CONCEPT
→ VISUAL EXPLANATION
→ JAVA CODE
→ MEMORY / EXECUTION VISUALIZATION
→ STUDENT CHALLENGE
→ CORRECTION
→ PRACTICE
→ TAKEAWAY

Do NOT create a sequence of text-heavy slides.

Students should actively think every 5 to 7 slides.

The presentation must feel like a combination of:

university lecture
+
live coding session
+
modern IDE
+
interactive software engineering course
+
technical visual storytelling.

====================================================
MAIN LEARNING JOURNEY
====================================================

Visually communicate this global progression throughout the course:

JAVA
│
├── Comprendre le langage
│
├── Comprendre la JVM
│
├── Compiler et exécuter
│
├── Manipuler les types
│
├── Créer une classe
│
├── Créer des objets
│
├── Comprendre les références
│
├── Construire correctement un objet
│
├── Comprendre this
│
├── Manipuler tableaux et chaînes
│
├── Encapsuler l'état
│
├── Utiliser static
│
└── Faire collaborer plusieurs objets

The current position in this journey should be subtly visible.

====================================================
FORMAT
====================================================

Presentation format:

16:9
1920 × 1080 px

ONE Figma frame = ONE presentation slide.

Design every frame so that it can also be exported cleanly to PDF.

Create approximately:

Chapter 1:
18–22 presentation frames

Chapter 2:
30–38 presentation frames

Total:
approximately 50–60 strong pedagogical slides.

Do not create 100 repetitive slides.

====================================================
PDF-SAFE DESIGN
====================================================

This requirement is critical.

The interactive presentation will later be exported to PDF.

Therefore:

- essential information must never exist only on hover;
- do not hide important explanations inside popups;
- do not require scrolling inside a slide;
- each concept must remain understandable in the static frame;
- answer states must exist as separate frames;
- interaction states must also have PDF-readable equivalents;
- no content outside frame bounds;
- code must remain readable after export;
- typography must remain readable on projector and PDF.

Example:

Slide 20
QUIZ

Slide 21
QUIZ — CORRECTION

Do not place the correction only inside a hidden overlay.

====================================================
VISUAL IDENTITY
====================================================

Create a sophisticated visual identity inspired by:

JetBrains IDE
IntelliJ IDEA
modern developer tools
software engineering dashboards
premium university technology courses
technical documentation.

Do NOT create a childish educational style.

Do NOT create a generic corporate PowerPoint style.

The visual identity must immediately communicate:

JAVA
SOFTWARE ENGINEERING
PROGRAMMING
OBJECT ORIENTED DESIGN.

====================================================
COLOR PALETTE
====================================================

Main Java accent:
#E76F00

Deep navy:
#14213D

Dark developer background:
#111827

White:
#FFFFFF

Soft background:
#F5F7FA

Technical blue:
#2563EB

Success:
green

Errors and dangerous code:
red

Use colors semantically.

Do not overuse gradients.

====================================================
TYPOGRAPHY
====================================================

Main typography:
Inter, Manrope or similar modern sans-serif.

Code:
JetBrains Mono or equivalent monospace font.

Large titles.

Very high readability.

Avoid tiny academic text.

====================================================
SLIDE COMPONENT SYSTEM
====================================================

Create reusable components for the entire course:

CONCEPT
Definition / fundamental idea.

WHY?
Why the concept exists.

CODE LAB
Real Java example.

LIVE CODING
Code to demonstrate in class.

MEMORY VIEW
References, stack-like variables and heap-like objects.

UNDER THE HOOD
JVM / bytecode / execution / memory.

COMMON MISTAKE
Frequent student error.

THINK
Short question before revealing the answer.

PREDICT THE OUTPUT
Students predict program output.

FIND THE BUG
Students identify a problem.

CHECKPOINT
Fast conceptual verification.

MINI CHALLENGE
1–2 minute classroom activity.

LAB
Short practical programming task.

REMEMBER
Critical rule.

PRO TIP
Programming convention or good practice.

RECAP
Chapter synthesis.

Use these components consistently.

====================================================
NAVIGATION
====================================================

Create a premium persistent navigation system.

Top or bottom:

JAVA POO

01 Introduction
02 Classes & Objets
03 Practice

Current chapter highlighted.

Also show:
slide number
chapter progress.

Add a subtle progress line.

When interactive mode is used,
the chapter menu should be clickable.

====================================================
OPENING EXPERIENCE
====================================================

Create a cinematic first slide.

Large:

JAVA

Programmation Orientée Objet

Subtitle:

Comprendre.
Modéliser.
Coder.

Add subtle floating Java code:

public class
static
new
this
private
System.out.println()

Main visual:
a modern IDE or abstract Java architecture.

Do not overcrowd.

====================================================
OPENING PEDAGOGICAL HOOK
====================================================

Do not begin with definitions.

Create a question:

COMMENT PASSER DU MONDE RÉEL AU CODE ?

Show:

Étudiant
Voiture
Compte bancaire
Produit
Point

↓

JAVA OBJECTS

Then:

Pour modéliser le monde,
Java utilise des objets.

This slide should build curiosity.

====================================================
CHAPTER 1
INTRODUCTION AU LANGAGE JAVA
====================================================

Create a chapter transition:

01

INTRODUCTION AU LANGAGE JAVA

Subtitle:

Du code source à l'exécution.

Add a visual path:

.java
→ bytecode
→ JVM
→ machine.

====================================================
WHY JAVA?
====================================================

Create:

Pourquoi Java ?

Use five strong cards:

Orienté objet
Multiplateforme
Fortement typé
Concurrent
Sécurisé

Minimal text.

Use strong iconography.

====================================================
JAVA HISTORY
====================================================

Use an elegant horizontal timeline.

1991
James Gosling
Sun Microsystems

1993
Internet creates new opportunities.

Then visually introduce:

Write Once
Run Everywhere

Do not use paragraphs.

====================================================
JAVA ECOSYSTEM
====================================================

Create a visual formula:

JAVA

=

LANGAGE
+
JVM
+
API

Then create an architecture:

Application Java

↓
API Java

↓
JVM

↓
Operating System

↓
Hardware

Use clean software architecture blocks.

====================================================
WRITE ONCE RUN EVERYWHERE
====================================================

Make this a major visual slide.

JAVA SOURCE

↓

COMPILER

↓

BYTECODE

↓

JVM

↙ ↓ ↘

Windows
Linux
macOS

Use arrows and platform cards.

====================================================
JAVA EDITIONS
====================================================

Create three cards using the source material:

JAVA SE
Standard Edition

JAVA EE
Enterprise / Server

JAVA ME
Mobile / Embedded

Keep descriptions concise.

====================================================
FIRST JAVA PROGRAM
====================================================

Transition:

ENOUGH THEORY.

LET'S CODE.

Then show:

Salem.java

in a premium IDE window.

Use:

public class Salem {

    public static void main(String[] args) {
        System.out.println("Salem");
    }

}

Highlight progressively:

class
main
System.out.println

Use external annotations.

====================================================
JAVA CODE ANATOMY
====================================================

Take the same program and visually annotate:

public class Salem
→ class declaration

main
→ entry point

String[] args
→ parameters

System.out.println
→ output.

Do not show another unrelated example.

====================================================
SOURCE TO EXECUTION
====================================================

Create a pipeline:

Salem.java

↓ javac

Salem.class

↓ java Salem

JVM

↓

Salem

Also show a modern terminal:

$ javac Salem.java

$ java Salem

Salem

====================================================
UNDER THE HOOD
====================================================

Create a technical slide:

WHAT ACTUALLY HAPPENS?

Source code

→ compiler

→ bytecode

→ JVM

→ machine instructions.

Use animation-style sequence.

The static PDF frame must also show the complete flow.

====================================================
CLASS FILE RULE
====================================================

Show visually:

public class Salem

↓

Salem.java

Key rule:

Nom de la classe publique
=
nom du fichier Java.

Use GOOD / ERROR examples.

====================================================
POINT EXAMPLE
====================================================

Use the existing Point example.

Do NOT show all code immediately.

Create 3 stages:

1.
What is a Point?

Visual coordinate plane.

2.
Represent it in Java.

x
y

3.
Give it behavior.

distance(Point p)

Then show the code.

====================================================
IDENTIFIERS
====================================================

Create:

COMMENT BIEN NOMMER EN JAVA ?

Visual convention cards:

Class:
UneClasse

Method:
uneMethode()

Variable:
uneVariable

Constant:
UNE_CONSTANTE

Show GOOD and BAD.

====================================================
COMMENTS
====================================================

Use three code cards:

//

/* */

/** */

Explain:

Single line

Multiple lines

Javadoc

Avoid an old table.

====================================================
PRIMITIVE TYPES
====================================================

Create a modern type map.

INTEGER

byte
short
int
long

DECIMAL

float
double

OTHER

boolean
char

Display bit sizes where the source course provides them.

Use a visual memory scale.

====================================================
CASTING
====================================================

Create:

TYPE CONVERSION

Visual:

SMALL → LARGE
implicit

LARGE → SMALL
explicit

Warning:
possible loss of data.

Then show:

int i = 60;
short b = (short) (i + 5);

and:

int n = (int) 1.99;

Visually:

1.99

↓

cast

↓

1

====================================================
INTERACTIVE CHALLENGE
====================================================

Create a slide:

PREDICT THE RESULT

byte b1 = 20;
byte b2 = 15;
byte b3 = b1 + b2;

Question:

Que se passe-t-il ?

A
b3 = 35

B
Erreur de compilation

C
Erreur à l'exécution

Use clickable answer cards.

When clicked,
show visual feedback.

But also create a separate next frame:

CORRECTION

Explain visually:

byte + byte

↓

int

therefore explicit cast is required.

====================================================
CHAPTER 1 RECAP
====================================================

Create a visual concept map:

JAVA

Language

JVM

Bytecode

Compilation

Primitive Types

Cast

Then:

5 choses à retenir.

Use very short statements.

====================================================
CHAPTER 1 CHECKPOINT
====================================================

Create an interactive 4-question quiz.

Questions based only on the chapter.

Examples:

Quel fichier contient le bytecode ?

Quelle commande compile ?

Quel est le rôle de la JVM ?

Quel cast nécessite une conversion explicite ?

Provide clickable answers.

Each question also needs a static correction frame.

====================================================
CHAPTER TRANSITION
====================================================

Create a strong visual transition.

Text:

JUSQU'ICI,
NOUS AVONS ÉCRIT DU JAVA.

MAINTENANT,
NOUS ALLONS MODÉLISER LE MONDE.

02

CLASSES & OBJETS

====================================================
CHAPTER 2
CLASSES ET OBJETS
====================================================

Opening title:

CLASSES
&
OBJECTS

Subtitle:

Du modèle à l'instance.

Show:

REAL WORLD

↓

CLASS

↓

OBJECT

====================================================
PROBLEM FIRST
====================================================

Begin with a real problem.

Show:

Imaginez 500 étudiants.

Bad approach:

nom1
nom2
nom3

note1
note2
note3

...

Question:

Peut-on faire mieux ?

Then reveal:

CLASS ETUDIANT

====================================================
FROM REALITY TO MODEL
====================================================

Create:

ÉTUDIANT

↓

ATTRIBUTES

nom
prenom
moyenne

+

BEHAVIOR

afficher()
calculerMention()

↓

JAVA CLASS

Make the relationship visual.

====================================================
CLASS VS OBJECT
====================================================

This must be one of the strongest slides.

CLASS

Blueprint / model

Point
x
y
afficher()
deplacer()

versus

OBJECTS

p1
x = 3
y = 4

p2
x = 9
y = -5

Use actual object cards.

====================================================
ANATOMY OF A CLASS
====================================================

Use Java IDE:

class Point {

    int x;
    int y;

    void afficher() {
        ...
    }

    void deplacer(int dx, int dy) {
        ...
    }
}

Use annotation arrows:

CLASS NAME

ATTRIBUTES

METHODS

PARAMETERS.

====================================================
UML TO JAVA
====================================================

Show:

Point
-----------------
x : int
y : int
-----------------
afficher()
deplacer(dx,dy)

↓

class Point { ... }

Teach mapping visually.

====================================================
OBJECT CREATION
====================================================

Create TWO frames.

FRAME A

Point p1;

Memory:

p1
↓
null

Label:

DECLARATION

FRAME B

p1 = new Point();

Memory:

p1
────────→
Point object

x = 0
y = 0

Label:

INSTANTIATION

====================================================
MEMORY VIEW
====================================================

Use this concept repeatedly.

For:

Point p1 = new Point(2,3);

Show:

VARIABLES

p1
│
└──────────→

MEMORY

Point
x = 2
y = 3

Use simplified memory visualization,
not academically inaccurate low-level JVM internals.

====================================================
REFERENCES
====================================================

Create:

Point p1 = new Point(2,3);
Point p2 = p1;

Visual:

p1 ────┐
        ├────→ Point
p2 ────┘      x = 2
              y = 3

Huge key message:

DEUX RÉFÉRENCES.
UN SEUL OBJET.

====================================================
REFERENCE CHALLENGE
====================================================

Slide:

WHAT HAPPENS?

Point p1 = new Point(2,3);
Point p2 = p1;

p2.x = 10;

System.out.println(p1.x);

Student chooses:

2

3

10

Error

Then correction slide.

Show visually that both references point to the same object.

====================================================
DOT OPERATOR
====================================================

Use:

p.x

p.y

p.afficher()

Visual rule:

OBJECT
.
MEMBER

Do not use paragraph explanation.

====================================================
CONSTRUCTORS
====================================================

Start with:

HOW DOES AN OBJECT COME TO LIFE?

Then:

new Point(3,4)

↓

CONSTRUCTOR

↓

Point object
x = 3
y = 4

Rules:

same name as class

no return type

initializes state.

====================================================
CONSTRUCTOR LIVE CODING
====================================================

Show:

class Point {

    int x;
    int y;

    Point(int px, int py) {
        x = px;
        y = py;
    }
}

Highlight only the constructor.

Add:

LIVE CODING

Ask instructor to create:

Point p = new Point(3,4);

====================================================
MULTIPLE CONSTRUCTORS
====================================================

Show three cards:

new Point()

new Point(3,4)

new Point(otherPoint)

Then:

SAME CLASS
DIFFERENT CONSTRUCTORS

Explain matching by parameters.

====================================================
THIS
====================================================

Create a before/after problem.

BAD:

Point(int x, int y) {
    x = x;
    y = y;
}

Question:

Which x is which?

Then:

Point(int x, int y) {
    this.x = x;
    this.y = y;
}

Color code:

this.x
OBJECT ATTRIBUTE

x
PARAMETER

Key:

this = objet courant.

====================================================
THIS INTERACTIVE
====================================================

Create a clickable visualization:

Point p1 = new Point(3,4);

Inside constructor:

this

When clicked/highlighted,
visually connect:

this
→ p1 object

Also create static PDF-safe explanation.

====================================================
ARRAYS
====================================================

Use visual memory cells.

int[] tab = new int[3];

↓

[0] [0] [0]

Then:

int[] tab = {8,6,1};

↓

[8] [6] [1]

Show indices:

0
1
2

====================================================
ARRAY UTILITIES
====================================================

Create compact chips:

arraycopy

equals

deepEquals

sort

binarySearch

fill

Use code icons.

Do not use large table.

====================================================
STRINGS
====================================================

Show:

String s1 = "Bonjour";
String s2 = "Bonjour";

Use reference visualization.

Then:

String s3 = new String("Bonjour");

Visually compare.

====================================================
STRING IMMUTABILITY
====================================================

Show:

s = "Java"

then:

s = "Java SE"

Old String object does not change.

Reference points to another value.

Hero statement:

STRING IS IMMUTABLE.

====================================================
== VS EQUALS
====================================================

Create a very strong COMMON MISTAKE slide.

==

COMPARES REFERENCES

equals()

COMPARES CONTENT

Use two String objects
both containing:

"Bonjour"

Make the visual immediately understandable.

====================================================
STRING CHALLENGE
====================================================

Ask:

String a = new String("Java");
String b = new String("Java");

a == b ?

a.equals(b) ?

Students select answers.

Then separate correction slide.

====================================================
STRINGBUILDER
====================================================

Compare:

String
Immutable

vs

StringBuilder
Mutable

Show:

append
insert
replace
delete

====================================================
METHOD OVERLOADING
====================================================

Show:

translate(int dx, int dy)

translate(Point p)

Same name.

Different signature.

Hero label:

OVERLOADING.

Then warning:

Changing only return type
does NOT create a valid overload.

====================================================
STATIC
====================================================

Use visual contrast.

INSTANCE

p1.x = 2

p2.x = 8

each object has its own value.

STATIC

Point.nbPoints

shared by ALL objects.

Use 3 objects connected to one shared counter.

====================================================
STATIC LIVE DEMO
====================================================

Sequence:

Point.nbPoint = 0

Create p1

0 → 1

Create p2

1 → 2

Create p3

2 → 3

Make this visually animated in interactive presentation.

In static PDF,
show all stages side by side.

====================================================
PASSAGE DE PARAMÈTRES
====================================================

Use the course's distinction visually.

PRIMITIVE

copy of the value.

OBJECT REFERENCE

copy of the reference value.

Avoid saying Java passes objects directly.

Use a memory diagram.

====================================================
PACKAGES
====================================================

Use an IDE project tree.

src
└── vehicule
    ├── Voiture.java
    ├── Moto.java
    └── voiture
        └── VoitureEssence.java

Show:

package vehicule;

Then imports:

import java.util.ArrayList;

import java.util.*;

====================================================
ENCAPSULATION
====================================================

Start from a problem.

BAD:

class Point {
    public double rho;
}

Outside:

p.rho = -1;

Show red warning:

INVALID STATE

Then:

private double rho;

Hero message:

PROTECT THE OBJECT'S STATE.

====================================================
ENCAPSULATION VISUAL
====================================================

Create:

OUTSIDE WORLD

↓

setter

↓

validation

↓

PRIVATE STATE

↓

getter

↓

OUTSIDE WORLD

Use shield / lock visual lightly.

====================================================
VISIBILITY
====================================================

Create a modern access matrix for:

public

private

protected

default

Very readable.

Avoid excessive detail.

====================================================
GETTERS AND SETTERS
====================================================

Show:

private int x;
private int y;

Then:

getX()
getY()

setX()
setY()

Use arrows.

External code

→ setter

→ validation

→ state.

====================================================
ENCAPSULATION BENEFIT
====================================================

Use the Segment example from the source material.

Implementation A:

private Point p1, p2;

Implementation B:

private Point[] tab;

Show:

PUBLIC INTERFACE

STAYS THE SAME

while:

INTERNAL IMPLEMENTATION

CAN CHANGE.

Key message:

ENCAPSULATION REDUCES COUPLING.

====================================================
INTEGRATED EXAMPLE
====================================================

Create a recurring mini-project:

GESTION UNIVERSITAIRE

Use:

Etudiant

Attributes:
nom
prenom
moyenne

Methods:
afficher()
calculerMention()

Then progressively use it to demonstrate:

constructor

this

private

getter

setter

static

object creation.

This is a pedagogical extension;
keep the core theory aligned with the supplied course.

====================================================
FINAL MINI CHALLENGE
====================================================

Create:

BUILD THE CLASS

ETUDIANT

Requirements:

name
grade

Constructor

private attributes

getters

setter for grade

static counter

Students identify:

class

object

reference

constructor

attribute

method

static member.

Then provide full correction.

====================================================
CHAPTER 2 CONCEPT MAP
====================================================

Create:

CLASS

↓ creates

OBJECT

↓ contains

STATE
+
BEHAVIOR

NEW

↓ invokes

CONSTRUCTOR

THIS

↓ current object

PRIVATE

↓ protects

STATE

STATIC

↓ belongs to

CLASS

====================================================
END OF COURSE CHECKPOINT
====================================================

Create a rich visual quiz.

Include:

CLASS OR OBJECT?

REFERENCE OR OBJECT?

INSTANCE OR STATIC?

== OR EQUALS?

PUBLIC OR PRIVATE?

IMPLICIT OR EXPLICIT CAST?

Use 6 large interactive cards.

Each answer must have a PDF-safe correction slide.

====================================================
CLASSROOM INTERACTIONS
====================================================

Every 5–7 slides,
include one of:

PREDICT THE OUTPUT

FIND THE BUG

TRUE OR FALSE

WHAT HAPPENS IN MEMORY?

CHOOSE THE CORRECT CODE

CLASS OR OBJECT?

== OR EQUALS?

STATIC OR INSTANCE?

WHAT DOES THIS REFER TO?

Keep interaction time:
30 seconds to 2 minutes.

====================================================
LIVE CODING SLIDES
====================================================

Create LIVE CODING frames where the instructor can stop presenting
and reproduce the code inside IntelliJ.

These frames should contain:

objective

starting code

expected result

small challenge.

Do not give too much code.

====================================================
SLIDE DENSITY
====================================================

Maximum per slide:

1 main idea

1 visual explanation

1 short example.

Avoid:

large paragraphs

dense tables

five concepts on the same slide.

====================================================
CODE DESIGN SYSTEM
====================================================

All Java code should use:

dark IDE background

Java syntax highlighting

proper indentation

filename tab

line numbers only when useful.

Highlight the current line being discussed.

Use colored annotations outside the code block.

Do not use screenshots of blurry code.

Create code natively in the design.

====================================================
VISUAL MEMORY SYSTEM
====================================================

Create a consistent memory diagram system throughout the course.

References:
small labeled variable cards.

Objects:
larger memory cards.

Arrows:
references pointing to objects.

Use the same visual language every time.

Example:

p1 ──────→ Point
           x = 2
           y = 3

When two references point to one object:

p1 ───┐
      ├────→ Point
p2 ───┘

This must become a recognizable teaching pattern.

====================================================
PROGRESSIVE DISCLOSURE
====================================================

Interactive version:

allow click to reveal:
- annotations;
- code explanations;
- answers;
- memory transitions.

However:

always create static companion frames
so that PDF export remains complete.

====================================================
ANIMATION GUIDELINES
====================================================

Use animation only when it teaches.

Good animation:

.java
→ bytecode
→ JVM

new
→ constructor
→ object

p1
→ object reference

p2
→ same object

this
→ current object

counter
0 → 1 → 2

Bad animation:

decorative flying text

random spinning icons

unnecessary parallax.

Animation must explain a concept.

====================================================
PROFESSIONAL DETAILS
====================================================

Add subtle details:

Java file tabs

terminal windows

IDE sidebars

small line-number gutters

package explorer

memory cards

syntax highlight.

But keep the slide clean.

====================================================
CHAPTER END STRUCTURE
====================================================

Each chapter ends with:

1.
Concept map

2.
5 things to remember

3.
Interactive quiz

4.
Mini coding challenge

5.
Next chapter teaser.

====================================================
FINAL SLIDE
====================================================

Create a minimalist closing slide.

JAVA

FROM SYNTAX
TO OBJECTS.

Then:

Vous savez maintenant:

comprendre l'exécution Java

créer une classe

instancier des objets

raisonner sur les références

utiliser des constructeurs

comprendre this

protéger l'état avec l'encapsulation

utiliser les membres static.

Then:

NEXT

Héritage
Polymorphisme
Interfaces
Exceptions

Mark these only as the future continuation of the module.

Large:

QUESTIONS ?

====================================================
FINAL QUALITY CHECK
====================================================

Before finalizing the design verify:

1. Every slide teaches only one main idea.

2. No series of slides is text-heavy.

3. Every difficult Java concept has a visual representation.

4. References and object memory are visualized consistently.

5. Java code is readable from the back of a classroom.

6. Every 5–7 slides contains an active student interaction.

7. Quiz solutions exist as separate frames.

8. Interactive features do not break the PDF version.

9. All slides use the same design system.

10. The presentation looks appropriate for a university engineering course.

11. The presentation feels modern, technical and premium.

12. It should feel designed in 2026,
not like a PowerPoint converted from an old Word document.