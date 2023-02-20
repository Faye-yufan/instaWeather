import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { Box, Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import './popup.css';
import 'fontsource-roboto';
import WeatherCard from './WeatherCard';
import { setStoredCities, getStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    getStoredCities().then(cities => setCities(cities));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
        setCities(updatedCities);
    })
  };

  return (
    <Box mx="8px" my="16px">
      <Grid>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(<App />, root);