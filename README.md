<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

![myOrbitTool logo](./images/myOrbitToolLogo.png)

<!--
    <img src="https://github.com/nikinclass/myOrbitTool/blob/main/ui/src/assets/logo-dark.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">myOrbitTool</h3>
<div>
  <p align="center">
    Description
    <br />
    <br />
    <a href="https://github.com/nikinclass/myOrbitTool">View Demo</a>
    &middot;
    <a href="https://github.com/nikinclass/myOrbitTool/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/nikinclass/myOrbitTool/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
##**Collaborators** 
###**Team Lead:** Gabriel Riggs
##Login Team:
Dustin Jordan/Gabriel Riggs/Michael Vulpo/Josh Krutz
##Scenario Team:
Josh Krutz/Jeffrey Eglinsdoerfer/Anthony Marantino/Nicole Gabor
##Spacetrack/Cesium:
Payton Rogers/Anthony Marantino
##UI:
Josh Krutz/Dustin Jordan/Gabriel Riggs/Michael Vulpo/Anthony Marantino/Payton Rogers/Jeffery Eglinsdoerfer/Nicole Gabor
  <ul>
    <li> <a img src="./images/myOrbitTool.jpeg">About The Project</a></li>
    <li><a href="https://github.com/nikinclass/myOrbitTool">myOrbitTool Project</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="https://github.com/nikinclass/myOrbitTool/issues">Roadmap</a></li>
    <li><a href="https://github.com/nikinclass/myOrbitTool/graphs/contributors">Contributing</a></li>
    <li><a href="https://github.com/nikinclass/myOrbitTool/blob/main/LICENSE">License</a></li>
    <li><a href= "https://github.com/users/nikinclass/projects/6/views/1?pane=issue&itemId=127645281&issue=nikinclass%7CmyOrbitTool%7C4">ERD-information</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    *Special thanks to Space Track, React, Docker, shadcn, and we send our gratitude out to Supra Coders (specifically Matt, Jeff, and Marcus for their support) and for the opportunity to work together on this project.*
  </ol>
## About The Project

[![myOrbitTool](./images/myOrbitTool.jpeg)(http://localhost:3000)]

<p align="right">(<a href="#readme-top">back to top</a>)</p>
**<h3>USSF lacks an accessible and unified solution for orbital mission planning. 
Current solutions are stove piped for specific constellations or are overclassified and 
unavailable for simple visualizations. ​<br><br>

We present a mission planning web-app for visualizing live/custom orbits, coverages,
and look-angles ​</h3>\*\*

### Built With

[![Postgres][Postgres]][Postgres-url]
[![Express.js][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node.js][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prerequisites

You will need [to install Docker](https://docs.docker.com/engine/install/) to run this project. I am using Docker version 28.3.2.

You need your own username and password for https://www.space-track.org in order to get all the already existing satellites.

- Enter your username in the docker-compose.yaml on line 10 and 41
- Enter your password in the docker-compose.yaml on line 11 and 42

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nikinclass/myOrbitTool.git
   ```
1. Start the docker container

   ```sh
   docker compose up
   ```

   git

#### For running microservices independently

1. Clone the repo

   ```sh
   git clone https://github.com/nikinclass/myOrbitTool.git
   ```

1. Ensure all fetches are using LOCALHOST_URL (not PROXIED_URL)

1. Start the docker container

   ```sh
   docker compose up
   ```

1. Start the ui service

   ```sh
   cd ./ui
   npm i
   npm run dev
   ```

1. Start the api server
   ```sh
   cd ./api
   npm i
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Current Project Offerings

- [ ] Modeling live satellites
- [ ] Ground stations
- [ ] Custom satellites
  - [ ] Saving and sharing scenarios

See the [open issues](https://github.com/nikinclass/myOrbitTool/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/nikinclass/myOrbitTool/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nikinclass/myOrbitTool" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[ERD-information]: https://github.com/users/nikinclass/projects/6/views/1?pane=issue&itemId=127645281&issue=nikinclass%7CmyOrbitTool%7C4
[contributors-shield]: https://img.shields.io/github/contributors/nikinclass/myOrbitTool.svg?style=for-the-badge
[contributors-url]: https://github.com/nikinclass/myOrbitTool/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nikinclass/myOrbitTool.svg?style=for-the-badge
[forks-url]: https://github.com/nikinclass/myOrbitTool/network/members
[stars-shield]: https://img.shields.io/github/stars/nikinclass/myOrbitTool.svg?style=for-the-badge
[stars-url]: https://github.com/nikinclass/myOrbitTool/stargazers
[issues-shield]: https://img.shields.io/github/issues/nikinclass/myOrbitTool.svg?style=for-the-badge
[issues-url]: https://github.com/nikinclass/myOrbitTool/issues
[license-shield]: https://img.shields.io/github/license/nikinclass/myOrbitTool.svg?style=for-the-badge
[license-url]: https://github.com/nikinclass/myOrbitTool/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Postgres]: https://img.shields.io/badge/Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://reactjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://reactjs.org/

</div>
