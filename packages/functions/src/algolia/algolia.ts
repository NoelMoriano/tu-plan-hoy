import { algoliasearch } from "algoliasearch";
import { environmentConfig } from "../config";

export const algoliaClient = algoliasearch(
  environmentConfig.clients.algolia.appId,
  environmentConfig.clients.algolia.apiKey
);
