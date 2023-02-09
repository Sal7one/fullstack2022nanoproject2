import supertest from "supertest";
import {SpecReporter} from "jasmine-spec-reporter";
import app from '../src/app';

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  })
);
