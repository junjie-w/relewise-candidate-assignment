import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getUserId, USER_ID_KEY } from '../userId-management.util'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
}

const mockExistingUserId = 'existing-user-123'
const mockNewUserId = 'new-user-123'

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => mockNewUserId)
  }
})

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('getUserId function', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserId', () => {
    it('should return existing userId from localStorage if it exists', () => {
      localStorageMock.getItem.mockReturnValue(mockExistingUserId)

      const result = getUserId()

      expect(localStorageMock.getItem).toHaveBeenCalledWith(USER_ID_KEY)
      expect(localStorageMock.setItem).not.toHaveBeenCalled()
      expect(result).toBe(mockExistingUserId)
    })

    it('should generate and store new userId when none exists', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = getUserId()

      expect(localStorageMock.getItem).toHaveBeenCalledWith(USER_ID_KEY)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(USER_ID_KEY, mockNewUserId)
      expect(result).toBe(mockNewUserId)
    })

    it('should generate and store new userId when localStorage returns empty string', () => {
      localStorageMock.getItem.mockReturnValue('')

      const result = getUserId()

      expect(localStorageMock.getItem).toHaveBeenCalledWith(USER_ID_KEY)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(USER_ID_KEY, mockNewUserId)
      expect(result).toBe(mockNewUserId)
    })
  })
})
