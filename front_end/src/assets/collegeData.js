const collegeList = ["A. D. Patel Institute of Technology",
    "A.K.G. Engineering College",
    "A.R.J. College of Engineering and Technology",
    "ABES Engineering College",
    "ACE Engineering College",

    "Bharati Vidyapeeth Institute of Management and IT",
    "Bharati Vidyapeeth University Institute of Management and Research",
    "Bharatiya Vidya Bhavans S. P. Jain Institute of Management and Research (SPJIMR)",
    "Bhartiya Pashu-Chikitsa Anusandhan Sansthan",
    "Bhatkhande Music Institute",
    "Bhavnagar University",
    "Bhilai Institute of Technology",
    "Bhiwani Institute of Technology and Sciences",
    "Bhoj Reddy Engineering College for Women",
    "Bhoomaraddi College of Engineering and Technology (BVBCET)",
    "Bhopal Engineering College",
    "Bidhan Chandra Krishi Viswavidyalaya",
    "Bihar Yoga Bharati",
    "Biju Patnaik University of Technology",
    "Birbhum Institute of Engineering and Technology",
    "Birla Institute of Applied Science",
    "Birla Institute of Technology - Ranchi",
    "Birla Institute of Technology and Science - BITS Pilani",
    "Birla Institute of Technology",

    "Doctor Ram Manohar Lohia Awadh University",

    "Geeta Institute Of Management And Technology",
    "Geetanjali Institute of Technical Studies",
    "Gitam Institute of Technology and Science",
    "Gitam University",
    "Gitarattan International Business School",
    "Global Academy of Technology",
    "Global Institute of Management and Technology (GIMT)",
    "Global Institute of Technology",
    "Goa Institute of Management",
    "Goa University",
    "Godavari Institute of Engineering and Technology",
    "Gogte Institute of Technology",
    "Gojan School of Business and Technology",
    "Gokaraju Rangaraju Institute of Engineering and Technology",
    "Gokhale Institute of Politics and Economics",
    "Gopal Ramalingam Memorial Engineering College",
    "Government College Of Engineering - Pune",
    "Government College of Arts",
    "Government College of Engineering",
    "Government College of Engineering Auranagabd",
    "Government College of Engineering and Ceramic Technology",
    "Government College of Engineering and Leather Technology",
    "Government College of Engineering",
    "Government Engineering College",
    "Government College of Technology",
    "Government Engineering College Ajmer",
    "Government Polytechnic Institute",
    "Government Polytechnic",
    "Govind Ballabh Pant Krishi Evam Praudyogik Vishwavidyalaya",
    "Govt. Mahila Engineering College",
    "Graphic Era Institute of Technology",
    "Great Lakes Institute of Management",
    "Greater Noida Institute of Technology",
    "Gudlavalleru Engineering College",
    "Gujarat Agricultural University",
    "Gujarat Ayurved University",
    "Gujarat University",
    "Gujarat Vidyapith",
    "Gulbarga University",
    "Gulzar Group Of Institutes",
    "Gurgaon Institute of Technology and Management",
    "Guru Ghasidas University",
    "Guru Gobind Singh College of Engineering and Technology",
    "Guru Gobind Singh Indraprastha University",
    "Guru Jambeshwar University",
    "Guru Nanak Dev University",
    "Guru Nanak Enginerring College",
    "Guru Ramdas Khalsa Institite of Technology",
    "Guru Tegh Bahadur Institute of Technology-GTBIT",
    "Gurukula Kangri Vishwavidyalaya",
    "Gurunanak Institute of Technology",
    "Gyan Ganga Institute of Technology and Sciences",
    "Gyan Vihar School of Engineering and Technology",
    "H.K.R.H. College",
    "HKBK College of Engineering",
    "HMS Institute of Technology",
    "Haldia Insitute of Technology",
    "Harcourt Butler Technological Institute - Kanpur",
    "Hemchandracharya North Gujarat University",
    "Hemwati Nandan Bahuguna Garhwal University",
    "Heritage Institute of Technology",
    "Hi-Point College of Engineering and Technology",
    "Himachal Pradesh University",
    "Hindustan College of Engineering",
    "Hindustan College of Science and Technology",
    "Hitkarini College of Engineering and Technology",
    "Holy Mary Institute of Technology and Science",
    "Hyderabad Central University",
    "IBS Ahmedabad",
    "IBS Hyderabad",
    "ICFAI Business School",
    "ICFAI National College",
    "ICFAI School of Information Technology",
    "ICFAI University",
    "IEC College of Engineering and Technology",
    "IMPS College of Engineering and Technology - IMPSCET",
    "IMS College Of Engineering",
    "INMANTEC Integrated Academy of Management and Technology",
    "Ilahia College of Engineering and Technology",
    "India Business School ",
    "Indian Agricultural Research Institute",
    "Indian Association for the Cultivation of Science",
    "Indian Business Academy",
    "Indian Institute of Foreign Trade",
    "Indian Institute of Information Management",
    "Indian Institute of Information Technology",
    "Indian Institute of Information Technology - IIIT Allahabad",
    "Indian Institute of Information Technology - IIIT Bangalore",
    "Indian Institute of Information Technology - IIIT Hyderabad",
    "Indian Institute of Information Technology - IIIT Kolkata",
    "Indian Institute of Information Technology - IIIT Pune",
    "Indian Institute of Information Technology Jabalpur",
    "Indian Institute of Information Technology and Management - Kerala",
    "Indian Institute of Information Technology and Management",
    "Indian Institute of Management",
    "Indian Institute of Rural Management",
    "Indian Institute of Science",
    "Indian Institute of Science and Information Technology",
    "Indian Institute of Science - IISc Bangalore",
    "Indian Institute of Science Education and Research Pune",
    "Indian Institute of Space Science and Technology",
    "Indian Institute of Social Welfare and Business Management",
    "Indian Institute of Technology - IIT Bhubaneswar",
    "Indian Institute of Technology - IIT Bombay",
    "Indian Institute of Technology - IIT Delhi",
    "Indian Institute of Technology - IIT Guwahati",
    "Indian Institute of Technology - IIT Kanpur",
    "Indian Institute of Technology - IIT Kharagpur",
    "Indian Institute of Technology - IIT Madras",
    "Indian Institute of Technology - IIT Powaii",
    "Indian Institute of Technology - IIT Roorkee",
    "Indian Institute of Technology - IIT Patna",
    "Indian Institute of Technology - IIT Ropar",
    "Indian Institute of Technology - IIT Hyderabad",
    "Indian Institute of Technology - IIT Gandhinagar",
    "Indian Institute of Technology - IIT Rajasthan",
    "Indian Institute of Technology - IIT Mandi",
    "Indian Institute of Technology - IIT Indore",
    "Indian Institute of Technology - IIT BHU",
    "Indian School of Business",
    "Indian School of Mines - Dhanbad",
    "Indian Statistical Institute",
    "Indira College of Engineering and Management",
    "Indira Gandhi Institute of Development and Research",
    "Indira Gandhi Institute of Technology",
    "Indira Gandhi Krishi Vishwavidyalaya",
    "Indira Gandhi National Open University",
    "Indira Gandhi Rashtriya Mukta Vishwavidyalaya",
    "Indira Institute of Management",
    "Indraprastha Institute of Information Technology",
    "Indira Kala Sangeet Vishwavidyalaya",
    "Indo Global Engineering",
    "Indore Institute of Science and Technology",
    "Indore Professional Studies Academy",
    "Indur Institute of Engineering and Technology",
    "Infant Jesus College of Engineering",
    "Institute of Informatics and Communication",
    "Institute for Development and Research in Banking Technology",
    "Institute for Electronic Governance",
    "Institute of Advanced Computer and Research",
    "Institute of Advanced Studies in Education",
    "Institute of Aeronautical Engineering",
    "Institute of Armament Technology",
    "Institute of Engineering and Science IPS Academy",
    "Institute of Engineering and Technology",
    "Institute of Foreign Trade and Management",
    "Institute of Industrial and Computer Management and Research A.T.S.S.  I.I.C.M.R.",
    "Institute of Information Technology and Management",
    "Institute of Management Research and Development",
    "Institute of Management Research",
    "Institute of Management Studies Career Development and Research",
    "Institute of Management Studies Noida",
    "Institute of Management Studies- Ghaziabad",
    "Institute of Management Technology",
    "Institute of Management and Research",
    "Institute of Mathematical Sciences - IMSc Chennai",
    "Institute of Productivity and Management",
    "Institute of Productivity and Management",
    "Institute of Road and Transport Technology",
    "Institute of Rural Management Anand",
    "Institute of Technology and Management",
    "Institute of Technology and Science (ITS)",
    "Institute of Technology and Marine Engineering",
    "Integral University",
    "International Institute for Population Sciences",
    "International Institute for Special Education",
    "International Institute of Information Technology",
    "International Institute of Management Science",
    "International Management Institute",
    "International School Of Informatics and Management",
    "International School of Business and Research",
    "International School of Business and Media",
    "International School of Informatics and Management",
    "International School of Information Management",
    "International School of Management Excellence",
    "Invertis Institute of Engineering and Technology",
    "Ishwarchand Vidya Sagar Institute of Technology and Management",


    "Padre Conceicao College of Engineering",
    "Pailan College of Management and Technology",
    "Pandit Ravishankar Shukla University",
    "Pandian Saraswathi yadava Engineering College",
    "Panimalar Engineering College",
    "Panipat Institute of Textile and Engineering",
    "Panjab University",
    "Park College of Engineering and Technology",
    "Parul Institute of Engineering and Technology",
    "Patel College Of Science and Technology",
    "Patna University",
    "Peoples Education Society Institute of Technology - PESIT",
    "Peoples Educational Soceity School of Engineering",
    "Periyar Maniammai College of Technology for Women",
    "Periyar University",
    "Pimpri Chichwad Polytechnic",
    "Pimpri Chinchwad College of Engineering",
    "Poddard International College",
    "Pondicherry Engineering College",
    "Pondicherry University",
    "Ponjesly College of Engineering",
    "Poona College",
    "Poornima College of Engineering",
    "Poornima Institute of Engineering and Technology",
    "Postgraduate Institute of Medical Education and Research",
    "Potti Sreeramulu Telugu University",
    "Pragati Engineering College",
    "Prakasam Engineering College",
    "Pranveer Singh Institute of Technology",
    "Prestige Institute of Management Dewas",
    "Priyadarshini College of Engineering",
    "Pune Institute of Computer Technology",
    "Pune Vidhyarthi Grihas College of Engineering and Technology",
    "Punjab Agricultural University",
    "Punjab College of Engineering and Technology",
    "Punjab Engineering College",
    "Punjab Technical University",
    "Punjab University - Chandigarh",
    "Punjabi University Neighbourhood Campus",
    "Punjabi University Patiala",
    "Pydah Engineering College",

];

export default collegeList