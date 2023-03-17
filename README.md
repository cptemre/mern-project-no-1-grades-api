![Login](public/imgs/example1.png)

<hr>

# Grades-API

## MERN Personal Project No: 1

![Table](public/imgs/example2.png)

<hr>

![Lessons](public/imgs/example3.png)

# Table of Contents

1. [Project Summary](#1-project-summary)
2. [Purpose of the Project](#2-purpose-of-the-project)
3. [Technologies](#3-technologies)
   1. [Language](#1-language)
   2. [Libraries](#2-libraries)
   3. [Styling](#3-styling)
   4. [Database](#4-database)
4. [Pages](#4-pages)
   1. [Admin Account](#admin-account)
   2. [Teacher Account](#teacher-account)
   3. [Student Account](#student-account)
5. [Video](#5-video)
6. [Live Page](#6-live-page)
7. [Credits](#7-credits)
8. [Licence](#8-licence)

<hr>

# 1. Project Summary

This is a MERN project contains MongoDB, ExpressJS, React and NodeJS. In the admin panel you can create, update, delete and read accounts of teachers, students and lessons. Assign lessons to teachers and students. You can give grades to students.

Teacher account is able to read his own lessons and students plus grade them.

Student account is able to read his own lessons.

<hr>

# 2. Purpose of the Project

I wanted to test my skills of JWT and cookie usage to connect my client with my server.

Creatind database collections to read and manipulate them.

<hr>

# 3. Technologies

## 1. Language

- [x] JavaScript

## 2. Libraries

- [x] React
- [x] Jquery
- [x] NodeJS
- [x] ExpressJS

## 3. Styling

- [x] CSS

## 4. Database

- [x] MongoDB

<hr>

# 4. Pages

## Admin Account

As long as we don't have the authorization to access the page, we will keep seeing the login page. When we successfuly login to our admin account we will be redirected to 'teachers' option. Here we can see the existing teachers, delete them by clicking 'x' button, update them by clicking the related tab and focus out.

By clicking to 'new' headline we will see a new row to create a new account. Here we only need to enter new user name and surname. Password and email will be created default but you can change them later by updating. If you want to cancel the process, simply click to 'x' button to remove new row. If you want to complete the action to create a new account then simply click to check symbol. If everything is successful then user will be created and shown on the screen.

If you click to '+' sign next to account name it will direct you to related person's page. Here you can assign new lessons and students to the teacher. Assigned lessons won't show on add section and only related semesters will be shown.

Above the table there are search buttons and an input area. You can enter which key word you want to search and click to related search button. This will filter the result by server. By clicking newly created search button you can click again to remove the filter.

Under table section there is a pagination dynamicly created by server results.

Click to left top corner arrows to see navigation menu. To close it you can click to same icon or click anywhere else on page. From here you can change the section to students. It is almost identical as teachers page but only includes student no column. This is required for every new created student account to be filled manually.

If you navigate to lessons option, here you can add new lessons to database to be used to add it to teachers. You can update them by clicking the name of the lesson. You can also delete them from database in here.

To log out from your account click to related button on navigation bar. Or else the jwt will keep you online for months.

## Teacher Account

Teachers have only one page to see their assigned lessons and students to assigned lessons. We see the semester is set to 1 automaticly on the page load. If any lesson is assigned we see them as well. We can delete the lesson from teacher by clicking garbage bin. To see the assigned students, click to down arrow.

If any assigned then we will see a list of students with an option to delete them from the lesson, see their no, name and grade. If there is no grade it will be ---- with a blue color. We can assign a grade and if it is positive than it will be shown green else red.

## Student Account

There is only grades page for students. You can change the semester to see your related lessons and their grades. Coloring of grades area is same as teacher's account.

# 5. Video

Video will be added.

# 6. Live Page

Live page may be added.

# 7. Credits

This project created by Emre Kunduraci. All the code and styling created by my own ideas. The image in the login page is taken from https://www.pexels.com website.

The project is completed in a month.

# 8. Licence

Copyright (c) 2023 Emre Kunduraci

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
