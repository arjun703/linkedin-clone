const axios = require('axios');
const fs = require('fs');
const path = require('path');

const imageUrls = [

"https://scorpion.mysites.io/wp-content/uploads/2020/05/made-in-usa-badge.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-2-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-4-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-1-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-3-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-Ped.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-Ped-4-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-Ped-3-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Adj-SB-Side-300x298.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Adj-SB-R-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Adj-SB-Bottom-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Adj-SB-L-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/Endurance-Set-16-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-1-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-3-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-4-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/Endurance_Ped_Set.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Endurance-Single-Ped-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/U-CHANNEL.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Adj-SB-Set-16-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-No-Ratio-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-Single-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-Single-2-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-Single-1-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race_Pedestal_Pair-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race_Pedestal_Single-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race_Pedestal_Pair1-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-Set-16a-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race_Pedestal_Set-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/AL-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/AL-8-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Bushings_500-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Marine-Set-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Marine-L-296x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Marine-Single-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Marine-R-298x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Marine-Bottom-297x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/XL-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/XL-8-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race_Pedestal_V6.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Shaft-Set-500-e1614023344364.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Shaft-Set-500-e1614022664563.png","https://scorpion.mysites.io/wp-content/uploads/2020/07/Shaft-Set-500-e1614023147209.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/07/Shaft-Mount-300x91.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/03/SCP3561-3566-3571-3572-.450-OFFSET.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/SHF2301.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/516Ped-1-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/516ped-16-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/516Ped-4-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38SA-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38SA-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38SH-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL38SH-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL716-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL716-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Polylock_Arrows-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL716SH-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/PL716SH-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/516blt-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/516blt-16.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/M8OD-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-Single-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-Single-C-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-Single-L-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-Single-R-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/3lube-150x115.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/1098-1199-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/LS_No_Ratio-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/1098-BU-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/LS-Single-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/LS1H-1.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/L92-1062-1162-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/L92-Single-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/L92-1062-1162_BU-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/L92-Ped_1-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/L92_Ped_4-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-Set-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-3-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-2-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Non-Adj-Bottom-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Set-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Single-3a-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Single-2a-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Single-1a-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Single-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Bottom-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/Jeep-Adj-Set.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/scc-scp7000ls1_xl-300x114.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/STND2301.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/Stand-Shim.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/shims.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/516smr-6-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/716smr-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/3700-01.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/07/Shaft-Set-500.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Shaft-Single-150x150.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Shaft-Pair-150x150.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/SCC-3700-01-lateral-300x227.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/End-Shaft-Single-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-Single-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-R-300x298.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-Bottom-296x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-L-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/Race-V6.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-16.jpg-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NBSA-12-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-Set-16.jpg-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/NB-12-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2020/05/FRF-6-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2020/05/FRF-8-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/u-channel-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/u-channel-8-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/VTS716L-1-300x300.png","https://scorpion.mysites.io/wp-content/uploads/2021/02/VTS716L-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/vts38s-1-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/vts38s-4-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/vts716s-1a-300x300.jpg","https://scorpion.mysites.io/wp-content/uploads/2021/02/vts716s-4-300x300.jpg"

 ];

const downloadImage = async (url, destination) => {
  const filename = path.basename(destination);
  
  // Check if the file already exists
  if (fs.existsSync(destination)) {
    console.log(`File ${filename} already exists. Skipping...`);
    return;
  }

  try {
    const response = await axios.get(url, { responseType: 'stream' });

    // Pipe the response stream to the file destination
    response.data.pipe(fs.createWriteStream(destination));

    // Return a promise to track when the download completes
    return new Promise((resolve, reject) => {
      response.data.on('end', () => {
        console.log(`File ${filename} downloaded successfully.`);
        resolve();
      });

      response.data.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
  }
};

const downloadImages = async () => {
  const folderPath = './images'; // Specify the local folder path

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Download each image sequentially
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const destination = path.join(folderPath, path.basename(imageUrl));

    await downloadImage(imageUrl, destination);
  }
};

downloadImages();
