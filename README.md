<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nikinclass/myOrbitTool">
    <img src="https://github.com/nikinclass/myOrbitTool/blob/main/ui/src/assets/logo-dark.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">myOrbitTool</h3>

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
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `nikinclass`, `myOrbitTool`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![Postgres][Postgres]][Postgres-url]
[![Express.js][Express.js]][Express-url]
[![React][React.js]][React-url]
[![Node.js][Node.js]][Node-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

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

## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

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
