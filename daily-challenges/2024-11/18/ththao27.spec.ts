import {test, Page, expect } from '@playwright/test';

test.describe('Solution for 2024-11-18', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://material.playwrightvn.com/026-trello.html');
        await addBoard(page, 'Cần làm');
        await addBoard(page, 'Đang làm');
        await addBoard(page, 'Đã hoàn tích');
    });

    test('Add task', async ({page}) => {
        await addTask(page, 'Viết bài Playwright Việt Nam', 'high');
    });
    test.afterEach(async ({page}) => {
        await delBoard(page, 3);
        await page.close();
    })
});

async function addBoard(page: Page, columnTitle: string) {
    const isColumnExist: boolean = await page.locator(`//h3[text()='${columnTitle}']`).isVisible();
    if (!isColumnExist) {
        await page.locator('//div[@class="add-list"]').click();
        await page.locator('//input[@class="list-input"]').fill(columnTitle);
        await page.locator('//button[text()="Thêm danh sách"]').click();
    }
}

async function delBoard(page: Page, boardNumber: number) {
    for (let i = 0; i < boardNumber; i++) {
        await page.locator('//span[@class="delete-list"]').nth(0).click();
    }
}

async function addTask(page: Page, taskTitle: string, priorityValue: string) {
    await page.locator('//div[@class="add-card"]').nth(0).click();
    await page.locator('//input[@class="card-input"]').nth(0).fill(taskTitle);
    await page.locator('//select[@class="priority-select"]').nth(0).selectOption({value: priorityValue});
    await page.locator('//button[@class="add-button"]').nth(0).click();
}
