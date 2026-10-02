class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        freq: dict[str, List[str]] = defaultdict(list)

        for word in strs:
            key = "".join(sorted(word))
            freq[key].append(word)

        return list(freq.values())
        