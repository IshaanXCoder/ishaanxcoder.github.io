import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
// @ts-expect-error Node runs this test directly with TypeScript support.
import { fetchContributions } from "./github.ts";

const item = {
  number: 42,
  title: "Fix memory persistence",
  html_url: "https://github.com/example/agents/pull/42",
  repository_url: "https://api.github.com/repos/example/agents",
  updated_at: "2026-10-18T00:00:00Z",
};

afterEach(() => mock.restoreAll());

test("keeps GitHub totals beyond the displayed page and normalizes repository links", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ total_count: 142, items: [item] }));
  const result = await fetchContributions("merged");
  assert.equal(result?.total, 142);
  assert.equal(result?.items[0].repository, "example/agents");
  assert.equal(result?.items[0].kind, "merged");
  assert.equal(result?.items[0].id, "example/agents#42");
});

test("distinguishes a valid empty result from unavailable data", async () => {
  mock.method(globalThis, "fetch", async () => Response.json({ total_count: 0, items: [] }));
  assert.deepEqual(await fetchContributions("open"), { total: 0, items: [] });
});

test("handles rate limits, network failures, incomplete results, and invalid links", async () => {
  const responses = [
    () => new Response(null, { status: 403 }),
    () => { throw new Error("offline"); },
    () => Response.json({ message: "invalid response" }),
    () => Response.json({ total_count: 1, incomplete_results: true, items: [item] }),
    () => Response.json({ total_count: 1, items: [{ ...item, html_url: "javascript:alert(1)" }] }),
    () => Response.json({ total_count: 1, items: [{ ...item, updated_at: "invalid" }] }),
  ];
  for (const response of responses) {
    mock.restoreAll();
    mock.method(globalThis, "fetch", async () => response());
    assert.equal(await fetchContributions("merged"), null);
  }
});
