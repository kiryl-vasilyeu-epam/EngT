import { Octokit } from '@octokit/rest';
import { OKTO_TOKEN } from 'constants';

export const octokit = new Octokit({ auth: OKTO_TOKEN });
