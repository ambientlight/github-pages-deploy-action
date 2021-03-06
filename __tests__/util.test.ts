import {execute} from '../src/util';
import {exec} from '@actions/exec';

jest.mock('@actions/exec', () => ({
  exec: jest.fn()
}))

describe('util', () => {
  describe('execute', () => {
    it('should be called with the correct arguements', async() => {
      await execute('echo Montezuma', './')
    
      expect(exec).toBeCalledWith(
        "echo Montezuma", [], {
          cwd: "./",
          listeners: {
            stdout: expect.any(Function)
          }
        }
      )
    });
  })
})