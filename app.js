console.log("Hello World");

async function getFilters() {
  const fs = require("fs");
  const dir = "./filters/";
  validFilters = [];
  files = fs.readdirSync(dir);
  files.forEach((file) => {
    filter = require(dir + file);
    if (typeof filter === "function") {
      validFilters.push(filter);
    } else {
      console.log("Invalid filter: " + file);
    }
  });
  return validFilters;
}

async function getFilter(filter) {
  return require("./filters/" + filter);
}

async function validateFilter(filter) {
  if (typeof filter === "function") {
    return true;
  } else {
    return false;
  }
}

async function getConfigFilters() {
  config = require("./config-filters.json");
  return config;
}

async function validateConfigFilters(config) {
  if (config.steps && Object.keys(config.steps).length > 0) {
    Object.keys(config.steps).forEach((step) => {
      if (config.steps[step].filter) {
        if (validateFilter(getFilter(config.steps[step].filter))) {
          if (
            config.steps[config.steps[step].next] ||
            !config.steps[step].next
          ) {
            return true;
          } else {
            console.log("Invalid next step: " + config.steps[step].next);
            return false;
          }
        } else {
          console.log("Invalid filter: " + config.steps[step].filter);
          return false;
        }
      } else {
        console.log("Missing filter on step " + step);
        return false;
      }
    });
  } else {
    console.log("No steps found");
    return false;
  }
}

async function executeConfigFilters(config, step, prevStepOutput) {
  getFilter(config.steps[step].filter).then((filter) => {
    console.log(
      "Step " + step + " - Executing filter: " + config.steps[step].filter
    );
    if (prevStepOutput) {
      config.steps[step].params.unshift(prevStepOutput);
      console.log(config.steps[step].params);
    }
    filter(...config.steps[step].params).then((result) => {
      console.log(config.steps[step]);
      if (config.steps[config.steps[step].next]) {
        console.log(
          "Step " + step + " - Next step: " + config.steps[step].next
        );
        executeConfigFilters(config, config.steps[step].next, result);
      } else {
        return;
      }
    });
  });
}

getFilters().then((filters) => {
  console.log(filters);
  getConfigFilters().then((config) => {
    if (validateConfigFilters(config)) {
      console.log("Config is valid");
      executeConfigFilters(config, "1");
    } else {
      console.log("Config is invalid");
    }
  });
});
