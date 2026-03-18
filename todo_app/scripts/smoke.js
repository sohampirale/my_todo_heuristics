#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Smoke test script for Todo App
 * 
 * This script performs basic HTTP checks on key routes
 * to verify the app is running correctly.
 */

const http = require('http');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const routes = [
  '/',
  '/tasks',
  '/projects',
  '/calendar',
  '/search',
  '/settings',
  '/auth',
  '/onboarding',
  '/research',
  '/admin/seeds',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${route}`;
    const start = Date.now();
    
    http.get(url, (res) => {
      const duration = Date.now() - start;
      resolve({
        route,
        status: res.statusCode,
        duration,
        ok: res.statusCode === 200,
      });
    }).on('error', (err) => {
      resolve({
        route,
        status: 0,
        duration: 0,
        ok: false,
        error: err.message,
      });
    });
  });
}

async function runSmokeTest() {
  console.log('🔍 Running smoke tests...\n');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  const results = [];
  
  for (const route of routes) {
    process.stdout.write(`Checking ${route}... `);
    const result = await checkRoute(route);
    results.push(result);
    
    if (result.ok) {
      console.log(`✅ ${result.status} (${result.duration}ms)`);
    } else {
      console.log(`❌ ${result.error || result.status}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  
  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\nFailed routes:');
    results.filter(r => !r.ok).forEach(r => {
      console.log(`  - ${r.route}: ${r.error || r.status}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All smoke tests passed!');
    process.exit(0);
  }
}

runSmokeTest().catch(err => {
  console.error('Smoke test error:', err);
  process.exit(1);
});
