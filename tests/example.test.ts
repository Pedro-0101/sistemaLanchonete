import { describe, it, expect } from 'vitest';
import { start } from '../src/index';

describe('data source', () => {
  it('initializes', async () => {
    const ds = await start();
    expect(ds.isInitialized).toBe(true);
  });
});
