import React from "react";
//css
import { FaHeart } from "react-icons/fa";
import "./css/about.css";

// import anime from "animejs/lib/anime.es.js";
// import * as THREE from 'js/three.module.js';
export default function About() {
 
  return (
    <section className="aboutCon">
      <div className="mainTitle">About</div>
      <p>This is a ReactJS Application with Authentication from Firebase.</p>
      <p>Feel free to visit my personal Website.</p>
      <a
        href="https://www.ifranklam.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>ifranklam.com </p>
      </a>
     
      <p className="madeWith">
        Made with <FaHeart className="" /> in Orlando, Florida
      </p>

   

      <div className="anime"></div>
  
   
    </section>
  );
  
}
  // anime({
  //   targets: ".anime",
  //   keyframes: [
  //     { translateY: -40 },
  //     { translateX: 250 },
  //     { translateY: 40 },
  //     { translateX: 0 },
  //     { translateY: 0 }
  //   ],
  //   duration: 4000,
  //   easing: "easeOutElastic(1, .8)",
  //   loop: true
  // });
//   var ctx = document.getElementById('myChart');
//   var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });